# Connect Ballerina with Asgardeo for build secure applications

Authenticating users and authorizing access are critical necessities for any front-end application. Today's digital landscape demands much more than simple username-password based authentications. Instead, enterprise-grade apps now require integration with identity providers to offer advanced security features like centralized user management, multi-factor authentication, social logins, and role-based access control. 

Ballerina simplifies this integration process by allowing seamless connection to any OAuth2-compatible identity provider. With a simple set of annotations added to any service, Ballerina automatically handles authentication and authorization based on tokens issued by the identity provider.

## Set up

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Create a new Asgardeo Application and configure it into the `connect_with_asgardeo_for_building_secure_services/Config.toml`. Please refer [this](https://wso2.com/asgardeo/docs/guides/applications/register-single-page-app/) to get more details.
The format of the sample `Config.toml` should be something like this
```
issuer="<ISSUER_URL>"
audience="<CLIENT_ID>"
jwksUrl="<JWKS_URL>"
```

3. Open a Terminal and run the Ballerina service

```
$ cd bff-samples
$ cd connect_with_asgardeo_for_building_secure_services/backend_server
$ bal run
```

4. Then open a new terminal and run the React service

```
$ cd bff-samples
$ cd connect_with_asgardeo_for_building_secure_services/frontend_server
$ npm start
```
