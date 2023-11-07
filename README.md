## Ballerina Persists module with databases

Ballerina's persistence features offer a straightforward way to work with data sources, making it easier to build an application's data access layer. By simply defining the required Ballerina records, the persistence package auto-generates all data access functions. This eliminates repetitive code, providing a simplified interface for inserting, updating and querying data with data tables directly mapped to Ballerina records.

1. Clone the project 

```
$ git clone https://github.com/ballerina-guides/bff-samples.git
```

2. Install MySQL on the machine

3. Add a new file `Config.toml` in the `/backend_server` directory and add the following configurations

```
[persists]
host = "<Database Host>"
port = <Database Port>
user = <Username of MySQL user>
password = <Password of MySQL user>
database = <database name>
```

4. Run the following SQL query to create a new database in the MySQL server.

```
CREATE DATABASE <database name>;
```

5. Run the SQL scripts `backend_server/generated/script.sql` and `backend_server/resources/init-data.sql` to create the tables and insert data into the tables in the MySQL database.

6. Open a new Terminal in the project path and run the Ballerina Server

```
$ cd bff-samples
$ cd persists/backend_server
$ bal run
```

4. Then open a new terminal in the project path and run the React server

```
$ cd bff-samples
$ cd persists/frontend_server
$ npm run dev
```
