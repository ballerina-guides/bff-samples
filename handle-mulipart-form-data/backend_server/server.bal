import ballerina/http;
import ballerina/io;
import ballerina/mime;
import ballerina/random;

type CustomerData record {|
    string firstName;
    string lastName;
    string address;
    int dependents;
|};

type Customer record {|
    *CustomerData;
    string id;
|};

final table<Customer> customerTable = table [
    {id: "C-123", firstName: "James", lastName: "Clerk", address: "456, ElmAvenue, Suite-7, Willowville", dependents: 2},
    {id: "C-234", firstName: "John", lastName: "Doe", address: "789, OakLane, Unit-C12, Pineville", dependents: 6},
    {id: "C-342", firstName: "Anna", lastName: "Watson", address: "101, Maple-Road, OfficeD, Birchwood", dependents: 7}
];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"]
    }
}
service /crm on new http:Listener(9090) {
    resource function get customers() returns Customer[] {
        return customerTable.toArray();
    }

    resource function get customers/[string customerId]/agreement() returns byte[]|http:InternalServerError {
        byte[]|error agreementForm = getAgreementForm(customerId);
        if agreementForm is error {
            return <http:InternalServerError>{
                body: {message: "Agreement form not found for the customer ID: " + customerId}
            };
        }
        return agreementForm;
    }

    resource function post customers(http:Request request) returns http:Created|http:InternalServerError {
        do {
            mime:Entity[] bodyParts = check request.getBodyParts();
            string registrationDataString = check bodyParts[0].getText();
            CustomerData registrationData = check registrationDataString.fromJsonStringWithType();
            byte[] image = check bodyParts[1].getByteArray();
            byte[] agreemntForm = check bodyParts[2].getByteArray();
            string customerId = check registerCustomer(registrationData, agreemntForm, image);
            return <http:Created>{body: {message: "Customer registered successfully.", customerId}};
        } on fail error e {
            return <http:InternalServerError>{body: {message: string `Error while processing the request: ${e.message()}`}};
        }
    }
}

function getAgreementForm(string customerId) returns byte[]|error {
    return check io:fileReadBytes(string `./resources/agreements/${customerId}.txt`);
}

function registerCustomer(CustomerData registrationData, byte[] agreemntForm, byte[] image) returns string|error {
    string customerId = string `C - ${check random:createIntInRange(100, 999)}`;
    check io:fileWriteBytes(string `./resources/agreements/${customerId}.txt`, agreemntForm);
    check io:fileWriteBytes(string `./resources/images/${customerId}`, image);
    customerTable.add({id: customerId, ...registrationData});
    return customerId;
}
