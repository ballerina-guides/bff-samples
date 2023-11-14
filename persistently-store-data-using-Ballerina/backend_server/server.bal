import ballerina/http;
import ballerina/persist;
import ballerina/random;

final Client orderDatabase = check new;

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /sales on new http:Listener(9090) {
    resource function get orders() returns Order[]|error {
        return from Order entry in orderDatabase->/orders(Order)
            select entry;
    };

    resource function get orders/[string id]() returns Order|http:NotFound|http:InternalServerError {
        Order|persist:Error orderEntry = orderDatabase->/orders/[id];
        if orderEntry is persist:NotFoundError {
            return <http:NotFound>{body: {message: string `Order not found, id: ${id}`}};
        }
        if orderEntry is persist:Error {
            return <http:InternalServerError>{
                body: {message: string `Error while retrieving the order ${orderEntry.message()}`}
            };
        }
        return orderEntry;
    };

    resource function get cargos/[string cargoId]/orders() returns Order[]|error {
        return from Order entry in orderDatabase->/orders(targetType = Order)
            where entry.cargoId == cargoId
            order by entry.quantity descending
            select entry;
    };

    resource function post orders(Order orderEntry) returns http:Ok|http:InternalServerError|http:BadRequest {
        orderEntry.cargoId = getCargoId();
        string[]|persist:Error submitResult = orderDatabase->/orders.post([orderEntry]);
        if submitResult is string[] {
            return http:OK;
        } 
        if submitResult is persist:ConstraintViolationError {
            return <http:BadRequest>{body: {message: string `Invalid cargo id: ${orderEntry.cargoId}`}};
        }
        return <http:InternalServerError>{
            body: {message: string `Error while inserting an order ${submitResult.message()}`}
        };
    };
}

isolated function getCargoId() returns string {
    int|random:Error id = random:createIntInRange(224, 226);
    return id is int ? string `S-${id}` : "S-224";
}
