import ballerina/persist as _;

public type Order record {|
    readonly string id;
    string customerId;
    string date;
    OrderStatus status;
    Cargo cargo;
    int quantity;
    string item;
|};

public type Cargo record {|
    readonly string id;
    string lat;
    string lon;
    string startFrom;
    string endFrom;
    Order[] orders;
    CargoType cargoType;
|};

public enum OrderStatus {
    PENDING,
    SHIPPED,
    DELIVERED,
    CANCELED,
    RETURNED
};

public enum CargoType {
    SHIPEX = "ShipEx",
    CARGO_WAVE = "CargoWave",
    TRADE_LOGIX = "TradeLogix"
};
