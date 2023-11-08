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
    // Example: http://localhost:9090/sales/orders
    isolated resource function get orders() returns Order[]|error {
        return from Order entry in orderDatabase->/orders(targetType = Order)
            select entry;
    };

    // Example: http://localhost:9090/sales/orders/HM-238
    isolated resource function get orders/[string id]() returns Order|http:NotFound|http:InternalServerError {
        Order|persist:Error orderEntry = orderDatabase->/orders/[id];
        if orderEntry is persist:NotFoundError {
            return <http:NotFound>{body: {message: string `Order not found, id: ${id}`}};
        } else if orderEntry is persist:Error {
            return <http:InternalServerError>{
                body: {message: string `Error while retrieving the order ${orderEntry.message()}`}
            };
        } else {
            return orderEntry;
        }
    };

    // Example: http://localhost:9090/sales/cargos/HM-238/orders
    isolated resource function get cargos/[string cargoId]/orders() returns Order[]|error {
        return from Order entry in orderDatabase->/orders(targetType = Order)
            where entry.cargoId == cargoId
            where entry.cargoId == cargoId
            order by entry.quantity descending
            select entry;
    };

    // Example: http://localhost:9090/sales/orders
    isolated resource function post orders(Order orderEntry) returns http:Ok|http:InternalServerError|http:BadRequest {
        orderEntry.cargoId = assignCargoId();
        string[]|persist:Error submitResult = orderDatabase->/orders.post([orderEntry]);
        if submitResult is string[] {
            return http:OK;
        } else if submitResult is persist:ConstraintViolationError {
            return <http:BadRequest>{body: {message: string `Invalid cargo id: ${orderEntry.cargoId}`}};
        } else {
            return <http:InternalServerError>{
                body: {message: string `Error while inserting an order ${submitResult.message()}`}
            };
        }
    };
}

isolated function assignCargoId() returns string {
    do {
        return string `S-${check random:createIntInRange(224, 226)}`;
    } on fail {
        return "S-224";
    }
}
