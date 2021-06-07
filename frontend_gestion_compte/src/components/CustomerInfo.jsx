import React, { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { customerErase } from '../Redux/Customer/actionCustomer';
import { useHistory } from 'react-router';

import axios from 'axios';

import '../styles/CustomerInfo.css';
import { RiDeleteBin5Line } from 'react-icons/ri';
import UserContext from '../context/UserContext';

const CustomerInfo = ({ customer = { name: 'Test', facture: 5300, paiement: -3200, email: 'test@test.com' }, edit = false, goToCustomer }) => {

    const userContext = useContext(UserContext)
    const balanceSign = customer.facture + customer.paiement < 0 ? 'negative-info' : 'positive-info';
    const history = useHistory();
    const dispatch = useDispatch();
    const [erased, setErased] = useState('');
    const [eraseMode, setEraseMode] = useState('')

    const eraseCustomer = () => {
        const indexCustomer = userContext.customers.findIndex(cust => cust.id === customer.id);
        axios.delete(process.env.REACT_APP_API_URL + '/customers', {
            data: { source: customer }
        })
            .then(() => {
                dispatch(customerErase(customer));
                userContext.customers.splice(indexCustomer, 1);
                setErased('erased');
            })
            .catch(err => console.log(err))
        history.push('/customers');
    }

    useEffect(() => {
        if (edit) {
            setEraseMode('erase-mode');
        } else {
            setEraseMode('');
        }
    }, [edit])

    return (
        <div className={`customer-info-component ${eraseMode}`}>

            <div className={`customer-info ${erased}`}>
                <div className="customer-name-info" onClick={() => goToCustomer(customer)}>
                    <h4>{customer.name}</h4>
                    <p className="facture-paiement-info">
                        <span className="facture-info">{customer.facture}.00 €</span>
                        <span className="paiement-info">{customer.paiement}.00 €</span>
                    </p>
                </div>
                <div className={`balance-info ${balanceSign}`}>
                    {customer.facture + customer.paiement}.00 €
                </div>
            </div>

            <div className="erase-bloc">
                <RiDeleteBin5Line size={25} onClick={eraseCustomer} />
            </div>
        </div>
    );
};

export default CustomerInfo;