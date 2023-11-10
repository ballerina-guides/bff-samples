import ballerina/graphql;

type Order record {|
    readonly string id;
    string customerId;
    string? shipId;
    Address? shippingAddress;
    string date;
    OrderStatus status;
    int quantity;
    string item;
|};

type Address record {|
    string number;
    string street;
    string city;
    string state;
|};

enum OrderStatus {
    PENDING,
    SHIPPED,
    DELIVERED,
    CANCELED,
    RETURNED
};

@graphql:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /sales on new graphql:Listener(9090) {
    resource function get orders(string? customerId) returns Order[] {
        if customerId is () {
            return orders.toArray();
        }
        return from Order entry in orders
            where entry.customerId == customerId
            select entry;
    }
}
