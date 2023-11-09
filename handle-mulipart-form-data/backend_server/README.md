## Ballerina with advanced payload validations

Web and mobile apps often transmit users' input as JSON payloads, requiring backends to handle JSON data extensively. Ballerina simplifies this by seamlessly mapping JSON data to its native records, enabling easier data manipulation. Additionally, Ballerina records offer features like constraint validation, optional fields, and open records, providing enhanced flexibility and control when working with dynamic frontends.

### Set up

1. Clone the project 

```
$ git clone https://github.com/SasinduDilshara/BFF-Samples.git
```

2. Open a Terminal and run the Ballerina Server

```
$ cd BFF-Samples
$ cd ballerina_rest_payload_validation
$ bal run
```

3. Then open a new terminal in the project path and run the React server

```
$ cd BFF-Samples
$ cd ballerina_rest_payload_validation/ui
$ npm start
```
