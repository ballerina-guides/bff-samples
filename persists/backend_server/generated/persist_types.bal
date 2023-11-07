// AUTO-GENERATED FILE. DO NOT MODIFY.

// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.

public enum OrderStatus {
    PENDING,
    SHIPPED,
    DELIVERED,
    CANCELED,
    RETURNED
}

public enum CargoType {
    SHIPEX = "ShipEx",
    CARGO_WAVE = "CargoWave",
    TRADE_LOGIX = "TradeLogix"
}

public type Order record {|
    readonly string orderId;
    string customerId;
    string date;
    OrderStatus status;
    string cargoId;
    int quantity;
    string item;
|};

public type OrderOptionalized record {|
    string orderId?;
    string customerId?;
    string date?;
    OrderStatus status?;
    string cargoId?;
    int quantity?;
    string item?;
|};

public type OrderWithRelations record {|
    *OrderOptionalized;
    CargoOptionalized cargo?;
|};

public type OrderTargetType typedesc<OrderWithRelations>;

public type OrderInsert Order;

public type OrderUpdate record {|
    string customerId?;
    string date?;
    OrderStatus status?;
    string cargoId?;
    int quantity?;
    string item?;
|};

public type Cargo record {|
    readonly string id;
    string lat;
    string lon;
    string startFrom;
    string endFrom;
    CargoType 'type;
|};

public type CargoOptionalized record {|
    string id?;
    string lat?;
    string lon?;
    string startFrom?;
    string endFrom?;
    CargoType 'type?;
|};

public type CargoWithRelations record {|
    *CargoOptionalized;
    OrderOptionalized[] 'order?;
|};

public type CargoTargetType typedesc<CargoWithRelations>;

public type CargoInsert Cargo;

public type CargoUpdate record {|
    string lat?;
    string lon?;
    string startFrom?;
    string endFrom?;
    CargoType 'type?;
|};

