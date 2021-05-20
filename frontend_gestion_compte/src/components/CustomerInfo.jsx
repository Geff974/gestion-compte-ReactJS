import React from 'react';
import '../styles/CustomerInfo.css';
import ButtonEraseCustomer from './smallComponents/ButtonEraseCustomer';

const CustomerInfo = ({ customer = { name: 'Test', facture: 5300, paiement: -3200, email: 'test@test.com' }, edit = false, goToCustomer }) => {

    const lettreLogo = customer.name.substr(0, 2);
    const balanceSign = customer.facture + customer.paiement < 0 ? 'negatif-info' : 'positif-info';

    return (
        <div className="customer-info">
            <div className="logo-info" onClick={() => goToCustomer(customer)}><p>{lettreLogo}</p></div>
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
                    <ButtonEraseCustomer customer={customer} />
                }
            </div>
        </div>
    );
};

export default CustomerInfo;