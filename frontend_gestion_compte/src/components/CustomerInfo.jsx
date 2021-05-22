import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { customerErase } from '../Redux/Customer/actionCustomer';
import { useHistory } from 'react-router';

import axios from 'axios';

import '../styles/CustomerInfo.css';

const CustomerInfo = ({ customer = { name: 'Test', facture: 5300, paiement: -3200, email: 'test@test.com' }, edit = false, goToCustomer }) => {

    const balanceSign = customer.facture + customer.paiement < 0 ? 'negative-info' : 'positive-info';
    const history = useHistory();
    const dispatch = useDispatch();
    const [erased, setErased] = useState('');

    const eraseCustomer = () => {
        axios.delete(process.env.REACT_APP_API_URL + '/customers', {
            data: { source: customer }
        })
            .then(() => {
                dispatch(customerErase(customer));
                setErased('erased');
            })
            .catch(err => console.log(err))
        history.push('/customers');
    }

    return (
        <div className={`customer-info ${erased}`}>
            <div className="erased-bloc"></div>
            <div className="customer-name-info" onClick={() => goToCustomer(customer)}>
                <h4>{customer.name}</h4>
                <p className="facture-paiement-info">
                    <span className="facture-info">{customer.facture}.00 €</span>
                    <span className="paiement-info">{customer.paiement}.00 €</span>
                </p>
            </div>
            <div className={`balance-info ${balanceSign}`}>
                {customer.facture + customer.paiement}.00 €
                {edit &&
                    <div className="btn-erase-customer">
                        <p className="btn-erase" onClick={eraseCustomer}>X</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default CustomerInfo;