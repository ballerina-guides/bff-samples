import ballerina/http;
import ballerina/log;

configurable string tokenUrl = ?;
configurable string introspectUrl = ?;
configurable string clientId = ?;
configurable string clientSecret = ?;
configurable string certPath = ?;

listener http:Listener cargowaveListner = check new (9094);

@http:ServiceConfig {
    cors: {allowOrigins: ["*"]},
    auth: [
        {
            oauth2IntrospectionConfig: {
                url: introspectUrl,
                tokenTypeHint: "access_token",
                clientConfig: {
                    secureSocket: {cert: certPath},
                    auth: {clientId, clientSecret, tokenUrl}
                }
            },
            scopes: ["cargo_read"]
        }
    ]
}
service / on cargowaveListner {
    resource function post shipments() returns http:Accepted {
        log:printInfo("New cargo of CargoWave was successfully register to the megaport");
        return {
            body: {
                message: "New cargo of CargoWave was successfully register to the megaport"
            }
        };
    }
}
