final table<Order> key(id) orders = table [
    {
        id: "HM-278", 
        quantity: 5, 
        item: "TV", 
        customerId: "C-124", 
        shipId: "S-8", 
        date: "22-11-2023", 
        status: PENDING,
        shippingAddress: {
            number: "120",
            street: "Park St",
            city: "Brisbane",
            state: "QLD"
        }
    },
    {
        id: "HM-340", 
        quantity: 3, 
        item: "IPhone 14", 
        customerId: "C-73", 
        shipId: "S-32", 
        date: "12-11-2023", 
        status: DELIVERED,
        shippingAddress: {
            number: "15",
            street: "Briggs Rd",
            city: "Springwood",
            state: "QLD"
        }
    },
    {
        id: "HM-720", 
        quantity: 3, 
        item: "IPhone 15", 
        customerId: "C-73", 
        shipId: "S-8", 
        date: "12-10-2023", 
        status: DELIVERED,
        shippingAddress: {
            number: "167",
            street: "Green Rd",
            city: "Brisbane",
            state: "QLD"
        }
    },
    {
        id: "HM-9300", 
        quantity: 3, 
        item: "IPhone 15 pro", 
        customerId: "C-73", 
        shipId: "S-20", 
        date: "08-12-2023", 
        status: SHIPPED,
        shippingAddress: {
            number: "13",
            street: "Yellow Rd",
            city: "Springwood",
            state: "QLD"
        }
    }
];
