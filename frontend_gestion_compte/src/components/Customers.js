import React, { useState, useEffect } from 'react';
import CreateCustomer from './CreateCustomer';

const Customers = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/customers').then((response) => {
            return response.json();
        }).then((response) => {
            setCustomers(response);
        })
    }, [customers])

    return (
        <div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Crédit</th>
                        <th>Débit</th>
                        <th>Balance</th>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <h3>Ajouter un client</h3>
            <CreateCustomer />
        </div>
    );
};

export default Customers;