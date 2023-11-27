# Expose complex data with GraphQl

Web and mobile apps act as the interface for vast amounts of consolidated data, often requiring users to perform complex queries. With Ballerina's built-in GraphQL functionality, backend developers can simply expose Ballerina records via GraphQL services, facilitating advanced querying and targeted data fetching. This avoids over-fetching and under-fetching of data and reduces the number of network calls, resulting in better response times and lesser resource usage.

## Set up

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Open a Terminal and run the Ballerina service

```
$ cd bff-samples
$ cd expose_complex_data_with_graphql/backend_server
$ bal run
```

3. Then open a new terminal and run the React service

```
$ cd bff-samples
$ cd expose_complex_data_with_graphql/frontend_server
$ npm start
```
