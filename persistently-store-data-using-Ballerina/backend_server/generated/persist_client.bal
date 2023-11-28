// AUTO-GENERATED FILE. DO NOT MODIFY.
// This file is an auto-generated file by Ballerina persistence layer for model.
// It should not be modified by hand.
import ballerina/jballerina.java;
import ballerina/persist;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerinax/persist.sql as psql;

const ORDER = "orders";
const CARGO = "cargos";

public isolated client class Client {
    *persist:AbstractPersistClient;

    private final mysql:Client dbClient;

    private final map<psql:SQLClient> persistClients;

    private final record {|psql:SQLMetadata...;|} & readonly metadata = {
        [ORDER] : {
            entityName: "Order",
            tableName: "Order",
            fieldMetadata: {
                id: {columnName: "id"},
                customerId: {columnName: "customerId"},
                date: {columnName: "date"},
                status: {columnName: "status"},
                cargoId: {columnName: "cargoId"},
                quantity: {columnName: "quantity"},
                item: {columnName: "item"},
                "cargo.id": {relation: {entityName: "cargo", refField: "id"}},
                "cargo.lat": {relation: {entityName: "cargo", refField: "lat"}},
                "cargo.lon": {relation: {entityName: "cargo", refField: "lon"}},
                "cargo.startFrom": {relation: {entityName: "cargo", refField: "startFrom"}},
                "cargo.endFrom": {relation: {entityName: "cargo", refField: "endFrom"}},
                "cargo.cargoType": {relation: {entityName: "cargo", refField: "cargoType"}}
            },
            keyFields: ["id"],
            joinMetadata: {cargo: {entity: Cargo, fieldName: "cargo", refTable: "Cargo", refColumns: ["id"], joinColumns: ["cargoId"], 'type: psql:ONE_TO_MANY}}
        },
        [CARGO] : {
            entityName: "Cargo",
            tableName: "Cargo",
            fieldMetadata: {
                id: {columnName: "id"},
                lat: {columnName: "lat"},
                lon: {columnName: "lon"},
                startFrom: {columnName: "startFrom"},
                endFrom: {columnName: "endFrom"},
                cargoType: {columnName: "cargoType"},
                "orders[].id": {relation: {entityName: "orders", refField: "id"}},
                "orders[].customerId": {relation: {entityName: "orders", refField: "customerId"}},
                "orders[].date": {relation: {entityName: "orders", refField: "date"}},
                "orders[].status": {relation: {entityName: "orders", refField: "status"}},
                "orders[].cargoId": {relation: {entityName: "orders", refField: "cargoId"}},
                "orders[].quantity": {relation: {entityName: "orders", refField: "quantity"}},
                "orders[].item": {relation: {entityName: "orders", refField: "item"}}
            },
            keyFields: ["id"],
            joinMetadata: {orders: {entity: Order, fieldName: "orders", refTable: "Order", refColumns: ["cargoId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
        }
    };

    public isolated function init() returns persist:Error? {
        mysql:Client|error dbClient = new (host = host, user = user, password = password, database = database, port = port, options = connectionOptions);
        if dbClient is error {
            return <persist:Error>error(dbClient.message());
        }
        self.dbClient = dbClient;
        self.persistClients = {
            [ORDER] : check new (dbClient, self.metadata.get(ORDER), psql:MYSQL_SPECIFICS),
            [CARGO] : check new (dbClient, self.metadata.get(CARGO), psql:MYSQL_SPECIFICS)
        };
    }

    isolated resource function get orders(OrderTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get orders/[string id](OrderTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post orders(OrderInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ORDER);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from OrderInsert inserted in data
            select inserted.id;
    }

    isolated resource function put orders/[string id](OrderUpdate value) returns Order|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ORDER);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/orders/[id].get();
    }

    isolated resource function delete orders/[string id]() returns Order|persist:Error {
        Order result = check self->/orders/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ORDER);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    isolated resource function get cargos(CargoTargetType targetType = <>, sql:ParameterizedQuery whereClause = ``, sql:ParameterizedQuery orderByClause = ``, sql:ParameterizedQuery limitClause = ``, sql:ParameterizedQuery groupByClause = ``) returns stream<targetType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "query"
    } external;

    isolated resource function get cargos/[string id](CargoTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor",
        name: "queryOne"
    } external;

    isolated resource function post cargos(CargoInsert[] data) returns string[]|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CARGO);
        }
        _ = check sqlClient.runBatchInsertQuery(data);
        return from CargoInsert inserted in data
            select inserted.id;
    }

    isolated resource function put cargos/[string id](CargoUpdate value) returns Cargo|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CARGO);
        }
        _ = check sqlClient.runUpdateQuery(id, value);
        return self->/cargos/[id].get();
    }

    isolated resource function delete cargos/[string id]() returns Cargo|persist:Error {
        Cargo result = check self->/cargos/[id].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(CARGO);
        }
        _ = check sqlClient.runDeleteQuery(id);
        return result;
    }

    remote isolated function queryNativeSQL(sql:ParameterizedQuery sqlQuery, typedesc<record {}> rowType = <>) returns stream<rowType, persist:Error?> = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    remote isolated function executeNativeSQL(sql:ParameterizedQuery sqlQuery) returns psql:ExecutionResult|persist:Error = @java:Method {
        'class: "io.ballerina.stdlib.persist.sql.datastore.MySQLProcessor"
    } external;

    public isolated function close() returns persist:Error? {
        error? result = self.dbClient.close();
        if result is error {
            return <persist:Error>error(result.message());
        }
        return result;
    }
}

