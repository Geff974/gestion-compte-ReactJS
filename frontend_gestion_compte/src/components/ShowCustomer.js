import React from 'react'
import { useHistory } from 'react-router-dom';


function ShowCustomer(customer) {

    const history = useHistory();
    history.push('/customers/' + customer.name);

    return 1;

}

export default ShowCustomer;