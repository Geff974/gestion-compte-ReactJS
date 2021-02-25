import React from 'react'

function CustomersService() {

    const customers = fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
        return response.json();
    }).then((response) => {
        return response;
    })

    return customers;
}


export default CustomersService;
