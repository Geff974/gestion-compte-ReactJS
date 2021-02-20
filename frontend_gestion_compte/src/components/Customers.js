import React, { useState, useEffect } from 'react';
import CreateCustomer from './CreateCustomer';
import Title from './Title';

const Customers = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/customers').then((response) => {
            return response.json();
        }).then((response) => {
            setCustomers(response);
        })
    }, [])

    const handler = (newCustomers) => {
        console.log('New cust : ' + newCustomers)
        setCustomers(newCustomers);
    }

    const EraseCustomer = (customer) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: customer.name })
        };
        fetch('http://localhost:3001/customers', requestOptions)
            .then((err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response);
                }
            })
    }

    return (
        <div>
            <Title title='Clients' />
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Crédit</th>
                        <th>Débit</th>
                        <th>Balance</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, k) => {
                        return (
                            <tr key={k}>
                                <td> {customer.name} </td>
                                <td> {customer.credit} </td>
                                <td> {customer.debit} </td>
                                <td> {customer.credit - customer.debit},00 € </td>
                                <td><button onClick={() => EraseCustomer(customer)}>Effacer</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h3>Ajouter un client</h3>
            <CreateCustomer handler={handler} />
        </div>
    );
};

export default Customers;