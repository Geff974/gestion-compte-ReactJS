import React, { useState, useEffect } from 'react';
import CreateCustomer from './CreateCustomer';
import Title from './Title';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        fetchCustomers();
    }, [counter])

    const fetchCustomers = () => {
        fetch('http://localhost:3001/customers').then((response) => {
            return response.json();
        }).then((response) => {
            setCustomers(response);
        })
    }

    const EraseCustomer = (customer) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: customer.name })
        };
        fetch('http://localhost:3001/customers', requestOptions)
            .then((data) => {
                alert("'" + customer.name + "' à été effacé avec succés !");
                console.log('data : ' + data);
            })
        setCounter(counter + 1);
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
            <CreateCustomer setCounter={() => setCounter(counter)} />
        </div>
    );
};

export default Customers;