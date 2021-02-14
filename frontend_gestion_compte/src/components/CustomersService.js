import React from 'react'

function CustomersService() {

    const customers = fetch('http://localhost:3001/customers').then((response) => {
        return response.json();
    }).then((response) => {
        return response;
    })

    return customers;
}


export default CustomersService;
