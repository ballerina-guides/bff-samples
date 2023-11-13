# Validate payload constraints in Web backends

Web and mobile apps frequently use JSON payloads. With Ballerina's native JSON capabilities, JSON data can be mapped to Ballerina records with features like constraint validations.

## Set up

1. Clone the project

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Open a Terminal and run the Ballerina service

```
$ cd bff-samples
$ cd validate_payload_constraints_in_web_backends/backend_server
$ bal run
```

3. Then open a new terminal and run the React service

```
$ cd bff-samples
$ cd validate_payload_constraints_in_web_backends/frontend_server
$ npm run dev
```