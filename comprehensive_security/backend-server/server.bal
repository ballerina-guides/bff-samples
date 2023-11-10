import ballerina/http;

type Order record {|
    readonly string id;
    string customerId;
    string? shipId;
    string date;
    OrderStatus status;
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

final table<Order> key(id) orderTable = table [
    {id: "HM-278", quantity: 5, item: "TV", customerId: "C-124", shipId: "S-8", date: "22-11-2023", status: PENDING},
    {id: "HM-340", quantity: 3, item: "IPhone 14", customerId: "C-73", shipId: "S-32", date: "12-11-2023", status: DELIVERED}
];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000", "http://www.hmart-dev.com", "http://www.hmart.com"],
        allowHeaders: ["REQUEST_ID"],
        exposeHeaders: ["RESPONSE_ID"],
        maxAge: 84900
    }
}
// service /sales on new http:Listener(9090, 
// secureSocket = {
//     key: {
//         certFile: "../resources/public.crt",
//         keyFile: "../resources/private.key"
//     }
// }) {
service /sales on new http:Listener(9090) {

    @http:ResourceConfig {
        cors: {
            allowOrigins: ["http://localhost:3000", "http://www.hmart-dev.com", "http://www.hmart.com"],
            allowCredentials: true
        }
    }
    resource function post orders(Order orderEntry) returns http:Ok {
        orderTable.add(orderEntry);
        return <http:Ok>{body: {message: "Order submitted successfully"}};
    };

    resource function get orders() returns Order[] {
        return orderTable.toArray();
    };
}
