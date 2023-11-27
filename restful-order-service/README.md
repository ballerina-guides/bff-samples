# RESTful Order Service with Ballerina

Most web apps rely on REST APIs, with JSON serving as the predominant data exchange format. Handling REST API elements like path parameters, query parameters, HTTP headers, status codes, and complex JSON structures is crucial for web app backends. Ballerina addresses these needs effectively by incorporating all these REST features as first-class citizens within the language itself, simplifying the backend development process and making it more intuitive and efficient.

## Set up

1. Clone the project

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Open a Terminal and run the Ballerina Server

```
$ cd bff-samples
$ cd restful-order-service/backend_server
$ bal run
```

3. Then open a new terminal in the project path and run the React server

```
$ cd bff-samples
$ cd restful-order-service/frontend_server
$ npm run dev
```
