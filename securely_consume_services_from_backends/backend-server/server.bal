import microservices.cargoWave as _;
import microservices.shipEx as _;
import microservices.tradeLogix as _;

import ballerina/http;

configurable string cargoWaveUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string jwksUrl = ?;
configurable string shipExUrl = ?;
configurable string tokenUrl = ?;
configurable string tradeLogixUrl = ?;

type Cargo record {|
    readonly string id;
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

enum ShipStatus {
    DOCKED,
    DEPARTED,
    IN_TRANSIT,
    COMPLETED,
    CANCELED
};

final table<Cargo> cargoTable = table [
    {id: "SP-124", status: DEPARTED, lat: "1.2312", lon: "72.1110", startFrom: "London", endFrom: "Washington", cargoType: SHIPEX},
    {id: "SP-73", status: IN_TRANSIT, lat: "1.1110", lon: "72.1110", startFrom: "Melbourne", endFrom: "Sydney", cargoType: CARGO_WAVE}
];

final http:Client cargoClient = check new (
    cargoWaveUrl, auth = {tokenUrl, clientId, clientSecret, scopes: ["cargo_read"]},
    secureSocket = {
        // key: {certFile: "../path/public.crt", keyFile: "../path/private.key"},
        // cert: "../path/public.crt"
    }
);

final http:Client shipExClient = check new (
    shipExUrl, auth = {tokenUrl, clientId, clientSecret, scopes: ["cargo_read"]},
    secureSocket = {
        // key: {certFile: "../path/public.crt", keyFile: "../path/private.key"},
        // cert: "../path/public.crt"
    }
);

final http:Client tradeLogixClient = check new (
    tradeLogixUrl, auth = {tokenUrl, clientId, clientSecret, scopes: ["cargo_read"]},
    secureSocket = {
        // key: {certFile: "../path/public.crt", keyFile: "../path/private.key"},
        // cert: "../path/public.crt"
    }
);

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /logistics on new http:Listener(9090) {
    resource function post cargos(Cargo cargo) returns http:Ok|http:InternalServerError|http:BadRequest {
        cargoTable.add(cargo);
        do {
            http:Client serviceClient = cargo.cargoType == SHIPEX ?
                shipExClient : cargo.cargoType == CARGO_WAVE ?
                    cargoClient : tradeLogixClient;
            http:Response res = check serviceClient->post("/shipments", cargo);
            if res.statusCode == 202 {
                return <http:Ok>{body: "Successfully submitted the shipment request"};
            }
            return <http:BadRequest>{body: {message: string `Invalid cargo: ${cargo.id}`}};
        } on fail error e {
            return <http:InternalServerError>{
                body: {message: string `Failed to submit the shipment request: ${e.message()}`}
            };
        }
    }

    resource function get cargos() returns Cargo[] {
        return cargoTable.toArray();
    };
}
