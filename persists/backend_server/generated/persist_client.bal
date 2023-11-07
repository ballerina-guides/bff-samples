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
                orderId: {columnName: "orderId"},
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
                "cargo.type": {relation: {entityName: "cargo", refField: "type"}}
            },
            keyFields: ["orderId"],
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
                'type: {columnName: "type"},
                "order[].orderId": {relation: {entityName: "order", refField: "orderId"}},
                "order[].customerId": {relation: {entityName: "order", refField: "customerId"}},
                "order[].date": {relation: {entityName: "order", refField: "date"}},
                "order[].status": {relation: {entityName: "order", refField: "status"}},
                "'order[].cargoId": {relation: {entityName: "order", refField: "cargoId"}},
                "order[].quantity": {relation: {entityName: "order", refField: "quantity"}},
                "order[].item": {relation: {entityName: "order", refField: "item"}}
            },
            keyFields: ["id"],
            joinMetadata: {'order: {entity: Order, fieldName: "'order", refTable: "Order", refColumns: ["cargoId"], joinColumns: ["id"], 'type: psql:MANY_TO_ONE}}
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

    isolated resource function get orders/[string orderId](OrderTargetType targetType = <>) returns targetType|persist:Error = @java:Method {
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
            select inserted.orderId;
    }

    isolated resource function put orders/[string orderId](OrderUpdate value) returns Order|persist:Error {
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ORDER);
        }
        _ = check sqlClient.runUpdateQuery(orderId, value);
        return self->/orders/[orderId].get();
    }

    isolated resource function delete orders/[string orderId]() returns Order|persist:Error {
        Order result = check self->/orders/[orderId].get();
        psql:SQLClient sqlClient;
        lock {
            sqlClient = self.persistClients.get(ORDER);
        }
        _ = check sqlClient.runDeleteQuery(orderId);
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

