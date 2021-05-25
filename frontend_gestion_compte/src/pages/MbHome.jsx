import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { BiRightArrow } from 'react-icons/bi';
import { useHistory } from 'react-router';
import '../styles/MbHome.css';
import ListTransactions from '../components/ListTransactions';

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
    const [recentlyTransaction, setRecentlyTransaction] = useState([])

    // useEffect(() => {
    //     calcTot();
    //     setRecentlyTransaction(transactions);
    //     let i = 0
    //     while (recentlyTransaction[3]) {
    //         recentlyTransaction.splice(3, recentlyTransaction.length - 3);
    //         i++;
    //     }
    //     // if (recentlyTransaction.length > 4) {
    //     // }
    // }, [transactions])

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

    const goToTransactions = () => {
        history.push('/transactions');
    }


    return (
        <div className="mbHome">
            <header className='header-MbHome'>
                <div>
                    <h3>Bienvenue</h3>
                    <h1>{user.username}</h1>
                </div>
                <div className="profilImg">
                </div>
            </header>
            <div>
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

                {transactions !== undefined &&
                    <div className="transactions-list">
                        <h4>Dernières transactions</h4>
                        <p className="more-btn" onClick={goToTransactions}>Plus <BiRightArrow className="arrow-more-btn" /> </p>
                        <ListTransactions transactions={transactions} />
                    </div>
                }
            </div>
        </div>
    );
};

export default MbHome;