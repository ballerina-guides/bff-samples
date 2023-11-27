import ballerina/http;

configurable string issuer = ?;
configurable string audience = ?;
configurable string jwksUrl = ?;

final table<Order> key(orderId) orderTable = table [
    {orderId: "HM-278", quantity: 5, item: "TV", customerId: "C-124", shipId: "S-8", date: "22-11-2023", status: PENDING},
    {orderId: "HM-340", quantity: 3, item: "IPhone 14", customerId: "C-73", shipId: "S-32", date: "12-11-2023", status: DELIVERED}
];

final table<Cargo> key(cargoId) cargoTable = table [
    {cargoId: "SP-124", status: DEPARTED, lat: "1.2312", lon: "72.1110", startFrom: "London", endFrom: "Washington", cargoType: SHIPEX},
    {cargoId: "SP-73", status: IN_TRANSIT, lat: "1.1110", lon: "72.1110", startFrom: "Melbourne", endFrom: "Sydney", cargoType: CARGO_WAVE}
];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    },
    auth: [
        {
            jwtValidatorConfig: {
                issuer: issuer,
                audience: audience,
                signatureConfig: {
                    jwksConfig: {
                        url: jwksUrl
                    }
                }
            },
            scopes: ["order_insert", "order_read", "cargo_insert", "cargo_read"]
        }
    ]
}
service /sales on new http:Listener(9090) {
    @http:ResourceConfig {
        auth: {
            scopes: ["order_insert"]
        }
    }
    resource function post orders(Order orders) returns http:Ok {
        orderTable.add(orders);
        return <http:Ok>{body: {message: "Order submitted successfully"}};
    };

    @http:ResourceConfig {
        auth: {
            scopes: ["order_read", "order_insert"]
        }
    }
    resource function get orders() returns Order[] {
        return orderTable.toArray();
    };

    @http:ResourceConfig {
        auth: {
            scopes: ["cargo_insert"]
        }
    }
    resource function post cargos(Cargo cargos) returns http:Ok {
        cargoTable.add(cargos);
        return <http:Ok>{body: {message: "Cargo submitted successfully"}};
    };

    @http:ResourceConfig {
        auth: {
            scopes: ["cargo_read", "cargo_insert"]
        }
    }
    resource function get cargos() returns Cargo[] {
        return cargoTable.toArray();
    };

    @http:ResourceConfig {
        auth: {
            scopes: ["cargo_read", "cargo_insert"]
        }
    }
    resource function get cargos/[string id]() returns Cargo|http:NotFound {
        return cargoTable[id] ?: <http:NotFound>{body: string `Cargo not found. Cargo ID: ${id}`};
    };
}
