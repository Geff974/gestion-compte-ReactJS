import React from 'react';
import '../styles/CustomerInfo.css';

const CustomerInfo = ({ customer = { name: 'Test', facture: 5300, paiement: -3200, email: 'test@test.com' } }) => {

    const lettreLogo = customer.name.substr(0, 2);
    const balanceSign = customer.facture + customer.paiement < 0 ? 'negatif-info' : 'positif-info';

    return (
        <div className="customer-info">
            <div className="logo-info">{lettreLogo}</div>
            <div className="customer-name-info">
                <h4>{customer.name}</h4>
                <p className="facture-paiement-info">
                    <span className="facture-info">{customer.facture}.00 €</span>
                    <span className="paiement-info">{customer.paiement}.00 €</span>
                </p>
            </div>
            <div className={`balance-info ${balanceSign}`}>{customer.facture + customer.paiement}.00 €</div>
        </div>
    );
};

export default CustomerInfo;