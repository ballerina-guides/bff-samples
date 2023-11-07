import ballerina/http;
import ballerina/persist;
import ballerina/random;

final Client ordersDatabase = check new ();

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /sales on new http:Listener(9090) {

    // Example: http://localhost:9090/sales/orders
    isolated resource function post orders(Order orderEntry) returns http:Ok|http:InternalServerError|http:BadRequest|error {
        orderEntry.cargoId = check assignCargoId();
        string[]|persist:Error submitResult = ordersDatabase->/orders.post([orderEntry]);
        if submitResult is string[] {
            return http:OK;
        } else if submitResult is persist:ConstraintViolationError {
            return <http:BadRequest>{
                body: {
                    message: string `Invalid cargo id: ${orderEntry.cargoId}`
                }
            };
        } else {
            return <http:InternalServerError>{
                body: {
                    message: string `Error while inserting an order ${submitResult.message()}`
                }
            };
        }
    };

    // Example: http://localhost:9090/sales/orders
    isolated resource function get orders() returns Order[]|error {
        return from Order entry in ordersDatabase->/orders(targetType = Order)
            select entry;
    };

    // Example: http://localhost:9090/sales/orders/HM-238
    isolated resource function get orders/[string id]() returns Order|http:BadRequest {
        Order|error orderEntry = ordersDatabase->/orders/[id];
        if orderEntry is Order {
            return orderEntry;
        }
        return <http:BadRequest>{
            body: {
                message: string `Error while inserting the order, ${orderEntry.message()}`
            }
        };
    };

    // Example: http://localhost:9090/sales/cargos/HM-238/orders
    isolated resource function get cargos/[string cargoId]/orders() returns Order[]|error {
        return from Order entry in ordersDatabase->/orders(targetType = Order)
            where entry.cargoId == cargoId
            where entry.cargoId == cargoId
            order by entry.quantity descending
            select entry;
    };
}

isolated function assignCargoId() returns string|error {
    return string `S-${check random:createIntInRange(224, 226)}`;
}
