import ballerina/lang.runtime;
import ballerina/log;
import ballerina/random;
import ballerina/websocket;

type Location record {
    float latitude;
    float longitude;
};

// Example ws://localhost:9091/logistics/vehicles/V-20.
service /logistics on new websocket:Listener(9091) {
    resource function get vehicles/[string vehicleId]() returns websocket:Service {
        return new OrderService(vehicleId);
    }
}

distinct service class OrderService {
    *websocket:Service;

    string vehicleId;
    function init(string vehicleId) {
        self.vehicleId = vehicleId;        
    }

    remote function onOpen(websocket:Caller caller) returns error? {

        // Create a new strand  and allocate it to send the locations to the client 
        _ = start self.routeLocationFromServerToClient(caller, self.vehicleId);
        return;
    }

    remote function onClose(websocket:Caller caller) {
        log:printInfo("WebSocket connection closed");
    }

    remote function onError(websocket:Caller caller, error err) {
        log:printInfo("Error occured", err);
    }

    function routeLocationFromServerToClient(websocket:Caller caller, string vehicleId) returns error? {
        while true {
            Location currentLocation = {
                latitude: check random:createIntInRange(668700, 1246700) * 1.0 / 10000.0,
                longitude: check random:createIntInRange(258400, 493800) * 1.0 / 10000.0
            };
            error? e = caller->writeMessage(currentLocation);
            if e is error {
                log:printError(string `Error while upodating the location of vehicle: ${vehicleId}`, e);
                return;
            }
            runtime:sleep(3);
        }
    }
}
