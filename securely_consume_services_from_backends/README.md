## Ballerina for securely consume services from backends

Ballerina-powered backends can securely call services - whether on-premise, in a private cloud, or SaaS - with the necessary security features such as client-side OAuth2, mutual TLS, and JWT-encapsulated user data.

### Set up

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Create a new Asgardeo Application and configure it into the `securely_consume_services_from_backends/Config.toml`. Please refer this to get more details.

3. Open a Terminal and run the Ballerina service

```
$ cd BFF-Samples
$ cd securely_consume_services_from_backends/backend_server
$ bal run
```

4. Then open a new terminal in the project path and run the React service

```
$ cd BFF-Samples
$ cd securely_consume_services_from_backends/frontend_server
$ npm start
```
