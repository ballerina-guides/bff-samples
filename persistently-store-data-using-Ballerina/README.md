# Persistently store data using Ballerina

The [bal persist](https://central.ballerina.io/ballerina/persist/latest) feature offer a straightforward way to work with data sources, making it easier to build an application's data access layer. By simply defining the required Ballerina records, the `persist` package auto-generates all data access functions. This eliminates repetitive code, providing a simplified interface for inserting, updating, and querying data with data tables directly mapped into Ballerina records.

## Set up

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Add a new file named `Config.toml` in the `/backend_server` directory and add the following configurations for the MySQL server.

```
[data_persistence]
host = "<Database Host>"
port = <Database Port>
user = <Username of MySQL user>
password = <Password of MySQL user>
database = <database name>
```

3. Run the following SQL query to create a new database in the MySQL server.

```
CREATE DATABASE <database name>;
```

4. Run the SQL scripts `/backend_server/generated/script.sql` and `/backend_server/resources/init-data.sql` to create the tables and insert data into the tables in the MySQL database.

5. Open a new Terminal in the project path and run the Ballerina service

```
$ cd bff-samples
$ cd persistently-store-data-using-Ballerina/backend_server
$ bal run
```

6. Then open a new terminal in the project path and run the React service

```
$ cd bff-samples
$ cd persistently-store-data-using-Ballerina/frontend_server
$ npm run dev
```
