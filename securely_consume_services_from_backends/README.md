# Ballerina for securely consume services from backends

Ballerina-powered backends can securely call services - whether on-premise, in a private cloud, or SaaS - with the necessary security features such as client-side OAuth2, mutual TLS, and JWT-encapsulated user data.

## Set up

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Create a new Asgardeo Application and configure it into the `connect_with_asgardeo_for_building_secure_services/Config.toml`. Please refer [this](https://wso2.com/asgardeo/docs/guides/applications/register-single-page-app/) to get more details.

3. Add the client id and the Url of the Asgardeo organization in the `securely_consume_services_from_backends/frontend_server/src/App.jsx`.

4. Open a Terminal and run the Ballerina service

```
$ cd BFF-Samples
$ cd securely_consume_services_from_backends/backend_server
$ bal run
```

5. Then open a new terminal in the project path and run the React service

```
$ cd BFF-Samples
$ cd securely_consume_services_from_backends/frontend_server
$ npm start
```
