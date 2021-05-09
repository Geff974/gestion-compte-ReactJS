import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

import '../styles/Customers.css';
import CustomerInfo from '../components/CustomerInfo';

const Customers = () => {

    const customers = useSelector(state => state.customers.customers);
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const goToCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

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
            {customers.map((customer, k) => {
                return (
                    <div onClick={() => goToCustomer(customer)} key={k}>
                        <CustomerInfo customer={customer} />
                    </div>
                )
            })}
        </div>
    );
};

export default Customers;