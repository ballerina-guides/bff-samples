export const serverUrl = "http://localhost:9090";

// POST requests
export const submitOrderUrl = serverUrl + "/sales/orders";

// GET requests
export const getOrderUrl = serverUrl + "/sales/orders";
export const getCustomerOrderUrl = (id) => serverUrl + `/sales/customers/${id}/orders`;
