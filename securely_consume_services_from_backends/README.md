## Ballerina for securely consume services from backends

In today's IT environments where services are scattered across on-premises and cloud, no link is guaranteed to be secure. Strict security measures need to be enforced on all links. There is no exception for web or mobile app backends. Ballerina-powered backends can securely call services - whether on-premise, in a private cloud, or SaaS - with the necessary security features such as client-side OAuth2, mutual TLS, and JWT-encapsulated user data.

### Set up

1. Clone the project 

```
$ git clone https://github.com/SasinduDilshara/BFF-Samples.git
```

2. Create a new Asgardeo Application and configure it into the `ballerina_rest_asgardeo_jwt/Config.toml`. Please refer this to get more details.

3. Open a Terminal and run the Ballerina Server

```
$ cd BFF-Samples
$ cd ballerina_microservices_jwt_asgardeo
$ bal run
```

4. Then open a new terminal in the project path and run the React server

```
$ cd BFF-Samples
$ cd ballerina_microservices_jwt_asgardeo/ui
$ npm start
```
