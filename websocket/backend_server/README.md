## Ballerina with Websockets

Modern web and mobile app users expect real-time updates, whether it's tracking a cab's live location or viewing up-to-the-minute inventory levels. In-app chat functionality with sales agents or colleagues has also become a common feature. WebSockets emerge as the ideal technology for these real-time data transfers between front-end and back-end systems. 

Ballerina offers robust support for WebSockets, allowing services to be easily exposed over WebSocket connections. JSON-based WebSocket data is automatically mapped to Ballerina records, enabling simplified data processing. This comes with enterprise-ready security features like TLS, mutual MTLS, and OAuth2, ensuring authenticated and authorized streaming data transfers.

### Set up

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Open a Terminal and run the Ballerina Server

```
$ cd bff-samples
$ cd websocket/backend_server
$ bal run
```

3. Then open a new terminal in the project path and run the React server

```
$ cd bff-samples
$ cd websocket/frontend_server
$ npm run dev
```
