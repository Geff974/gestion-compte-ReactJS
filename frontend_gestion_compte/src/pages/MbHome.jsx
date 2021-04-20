import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { useHistory } from 'react-router';
import axios from 'axios';
import '../styles/MbHome.css';

const MbHome = () => {

    const customers = useSelector(state => state.customers.customers);
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const transactions = useSelector(state => state.transactions.transactions);
    const [totFactures, setTotFactures] = useState(0);
    const [totPaiements, setTotPaiements] = useState(0);

    useEffect(() => {
        calcTot();
    }, [transactions])

    const calcTot = () => {
        setTotPaiements(0);
        setTotFactures(0);
        transactions.forEach(transaction => {
            transaction.amount > 0 ? setTotFactures(prevState => prevState + transaction.amount) : setTotPaiements(prevState => prevState - transaction.amount);
        });
    }

    const calcBalance = (customer) => {
        return (customer.facture + customer.paiement)
    }

    const showCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    const dateSlice = (str) => {
        const strSplit = str.split('-');
        const strFinal = strSplit[2] + '/' + strSplit[1];
        return strFinal;
    }

    console.log('transaction' + transactions);


    return (
        <div>
            <header className='header-MbHome'>
                <div>
                    <h3>Bienvenue</h3>
                    <h1>Geffrey SAID</h1>
                </div>
                <div className="profilImg">
                </div>
            </header>
            <div className="cardCustomers">
                {customers !== null &&
                    <div className='card-list'>
                        {
                            customers.map(((customer, k) => {
                                return (
                                    <div key={k} className="customer-card" onClick={() => showCustomer(customer)}>
                                        <h4>{customer.name} <span>VISA</span></h4>
                                        <p>{calcBalance(customer)},00 €</p>
                                    </div>
                                )
                            }))
                        }
                    </div>
                }
            </div>

            <div className="transaction-mobile">
                <div className="recap">
                    <div className="recap-card">
                        <p className='recap-arrow arrow-up'> <MdArrowUpward size={25} /> </p>
                        <p> Factures <br /> <span>{totFactures},00 €</span> </p>
                    </div>
                    <div className="recap-card">
                        <p className='recap-arrow arrow-down'> <MdArrowDownward size={25} /> </p>
                        <p> Paiements <br /> <span>{totPaiements},00 €</span> </p>
                    </div>
                </div>

                {transactions !== null &&
                    <div className="transaction-list">
                        {transactions.map((transaction, k) => {
                            return (
                                <div key={k} className="transaction-line">
                                    {transaction.amount > 0 ? <p className="arrow-line arrow-up"> <MdArrowUpward size={25} /> </p> : <p className="arrow-line arrow-down"> <MdArrowDownward size={25} /> </p>}
                                    <p className='trans-detail'> <span className="trans-name">{transaction.name}</span> <span className="trans-date">{dateSlice(transaction.date)}</span></p>
                                    <p className="trans-amount">{transaction.amount},00 €</p>
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    );
};

export default MbHome;