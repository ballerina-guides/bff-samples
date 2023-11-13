import ballerina/http;

// configurable string tokenUrl = ?;
// configurable string introspectUrl = ?;
// configurable string clientId = ?;
// configurable string clientSecret = ?;
// configurable string certPath = ?;

listener http:Listener tradelogixListner = check new (9093);

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
service / on tradelogixListner {
    resource function post shipments() returns http:Accepted {
        return {
            body: {
                message: "New cargo was successfully register to the megaport"
            }
        };
    }
}
