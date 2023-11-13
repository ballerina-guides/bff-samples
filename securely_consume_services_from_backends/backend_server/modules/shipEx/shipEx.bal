import ballerina/http;
import ballerina/log;

// configurable string tokenUrl = ?;
// configurable string introspectUrl = ?;
// configurable string clientId = ?;
// configurable string clientSecret = ?;
// configurable string certPath = ?;

listener http:Listener shipexListner = check new (9092);

// @http:ServiceConfig {
//     cors: {allowOrigins: ["*"]},
//     auth: [
//         {
//             oauth2IntrospectionConfig: {
//                 url: introspectUrl,
//                 tokenTypeHint: "access_token",
//                 clientConfig: {
//                     secureSocket: {cert: certPath},
//                     auth: {clientId, clientSecret, tokenUrl}
//                 }
//             },
//             scopes: ["cargo_read"]
//         }
//     ]
// }
service / on shipexListner {
    resource function post shipments() returns http:Accepted {
        log:printInfo("New cargo of ShipEx was successfully register to the megaport");
        return {
            body: {
                message: "New cargo of ShipEx was successfully register to the megaport"
            }
        };
    }
}
