export const serverUrl = "http://localhost:9090";

// POST requests
export const submitCustomersUrl = serverUrl + "/crm/customers";

// GET requests";
export const getCustomersUrl = serverUrl + "/crm/customers"
export const getCustomerAgreementUrl = (customerId) => serverUrl + `/crm/customers/${customerId}/agreement`;
