type Order record {|
    readonly string orderId;
    string customerId;
    string? shipId;
    string date;
    OrderStatus status;
    int quantity;
    string item;
|};

type Cargo record {|
    readonly string cargoId;
    ShipStatus status;
    string lat;
    string lon;
    string startFrom;
    string? endFrom;
    CargoType cargoType;
|};

enum CargoType {
    SHIPEX = "ShipEx",
    CARGO_WAVE = "CargoWave",
    TRADE_LOGIX = "TradeLogix"
};

enum OrderStatus {
    PENDING,
    SHIPPED,
    DELIVERED,
    CANCELED,
    RETURNED
};

enum ShipStatus {
    DOCKED,
    DEPARTED,
    IN_TRANSIT,
    COMPLETED,
    CANCELED
};
