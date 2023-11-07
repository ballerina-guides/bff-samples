import ballerina/http;

public type Order record {|
    readonly string id;
    string customerId;
    string? shipId;
    string date;
    OrderStatus status;
    int quantity;
    string item;
|};

public enum OrderStatus {
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

    // Example: http://localhost:9090/sales/orders
    resource function get orders() returns Order[] {
        return orders.toArray();
    };

    // Example: http://localhost:9090/sales/orders/HM-238
    resource function get orders/[string id]() returns Order|http:NotFound {
        if orders.hasKey(id) {
            return orders.get(id);
        }
        return <http:NotFound>{ body: string `Order not found. Order ID: ${id}` };
    };

    // Example: http://localhost:9090/sales/customers/C-124/orders?status=PENDING
    resource function get customers/[string customerId]/orders(OrderStatus status = PENDING) returns Order[] {
        return from Order entry in orders
            where entry.customerId == customerId && entry.status == status
            select entry;
    };

    // Example: http://localhost:9090/sales/orders
    resource function post orders(Order orderRequest) returns Order|http:BadRequest {
        if orders.hasKey(orderRequest.id) {
            return <http:BadRequest>{ body: string `Order id already exists. Order ID: ${orderRequest.id}` };
        }
        orders.add(orderRequest);
        return orderRequest;
    }
}
