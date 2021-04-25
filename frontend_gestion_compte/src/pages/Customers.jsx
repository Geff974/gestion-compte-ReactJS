import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Customers.css';

const Customers = () => {

    const customers = useSelector(state => state.customers.customers);
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const balanceSign = (customer) => {
        const balance = customer.facture + customer.paiement;
        return balance >= 0 ? 'positif' : 'negatif';
    }

    const EraseCustomer = (customer) => {
        axios.post(process.env.REACT_APP_API_URL + '/customers', customer)
            .then((response) => console.log(response.data))
            .catch((err) => alert('Une erreur est survenue : ' + err));
    }

    return (
        <div>
            <div className="header-customers">
                <h1>Liste des clients</h1>
            </div>

            <table className="table-customers">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Balance</th>
                        <th>Effacer</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer, k) => {
                        return (
                            <tr key={k}>
                                <td><Link className="nav-link" to={`/customers/${customer.name}`}> {customer.name} </Link></td>
                                <td><Link className={'nav-link ' + balanceSign(customer)} to={`/customers/${customer.name}`}> {customer.facture + customer.paiement},00 € </Link></td>
                                <td><button className="btn-erase" onClick={() => EraseCustomer(customer)}>Effacer</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;