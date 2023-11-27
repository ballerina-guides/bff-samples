import ballerina/constraint;
import ballerina/http;

type Order record {|
    readonly string id;
    @constraint:String {
        pattern: {
            value: re `C-[0-9]{3}`,
            message: "Customer id should be in the format C-XXX"
        }
    }
    string customerId;
    string? shipId;
    string date;
    OrderStatus status;
    @constraint:Int {
        minValue: {value: 1, message: "Quantity should be greater than one"},
        maxValue: {value: 10, message: "Quantity should not exceed 10"}
    }
    int quantity;
    string item;
|};

enum OrderStatus {
    PENDING,
    SHIPPED,
    DELIVERED,
    CANCELED,
    RETURNED
};

final table<Order> key(id) orders = table [
    {id: "HM-278", quantity: 5, item: "TV", customerId: "C-124", shipId: "S-8", date: "22-11-2023", status: PENDING},
    {id: "HM-340", quantity: 3, item: "IPhone 14", customerId: "C-73", shipId: "S-32", date: "12-11-2023", status: DELIVERED}
];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /sales on new http:Listener(9090) {
    resource function post orders(Order orderRequest) returns Order|http:BadRequest {
        if orders.hasKey(orderRequest.id) {
            return <http:BadRequest>{body: string `Order id already exists.`};
        }
        orders.add(orderRequest);
        return orderRequest;
    }

    resource function get orders() returns Order[] {
        return orders.toArray();
    };
}
