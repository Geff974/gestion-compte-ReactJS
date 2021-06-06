import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import '../styles/detailCustomer.css';
import CreateTransaction from './CreateTransaction.jsx';
import { ReactComponent as HeaderImg } from '../styles/img/header-detail-customer.svg';
import ListTransactions from './ListTransactions';
import EditTransaction from './EditTransaction';
import EditAdd from './smallComponents/EditAdd';
import { AiOutlineLeftCircle } from 'react-icons/ai';

const DetailCustomer = () => {

    const customers = useSelector(state => state.customers.customers)
    const transactions = useSelector(state => state.transactions.transactions)
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const { name } = useParams();
    const [currentCustomer, setCurrentCustomer] = useState('');
    const [customerTransactions, setCustomerTransactions] = useState([]);
    const [colorText, setColorText] = useState('');

    // edit and create transaction
    const refEditTransaction = useRef(null);
    const refCreateTransaction = useRef(null);
    const tableTransaction = useRef(null);
    const [transactionToEdit, settransactionToEdit] = useState({ id: 0, date: "2017-03-11", name: 0, designation: 'Aucune', amount: 0 })
    const [addActive, setAddActive] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const indexOfCustomer = customers.findIndex(cust => cust.name === name);
        setCurrentCustomer(customers[indexOfCustomer]);
    }, [])

    useEffect(() => {
        balanceSign(currentCustomer);
        const transactionList = []
        transactions.map(trans => {
            if (trans.name === currentCustomer.name) {
                transactionList.push(trans);
            }
        });
        setCustomerTransactions(transactionList);
    }, [currentCustomer]);

    const balanceSign = (customer) => {
        const balance = customer.facture + customer.paiement;
        if (balance < 0) {
            setColorText('negative');
        } else {
            setColorText('positive');
        }
    }

    const editTransaction = (transaction) => {
        settransactionToEdit(transaction);
        refEditTransaction.current.className = "edit-transaction open";
    }

    const switchEdit = () => {
        setEdit(!edit);
    }

    const showCreateTransaction = () => {
        refCreateTransaction.current.className = 'create-transaction show';
        tableTransaction.current.className = 'transactions-list put-down';
        setAddActive(true);
    }

    const hideCreateTransaction = () => {
        refCreateTransaction.current.className = 'create-transaction';
        tableTransaction.current.className = 'transactions-list';
        setAddActive(false);
    }

    const goToHome = () => {
        history.push('/');
    }


    return (
        <div className="customer-detail-component">
            <div className="header-customer-detail">
                <HeaderImg className="header-img" />
            </div>
            {currentCustomer !== undefined &&
                <div className="header-customer-detail">
                    <h1 className="title-component"> <AiOutlineLeftCircle size={30} className="header-backward" onClick={goToHome} /> {(currentCustomer) ? currentCustomer.name : <p>Chargement...</p>}</h1>
                    <h3 className={`balance ${colorText}`}>Balance : {currentCustomer.facture + currentCustomer.paiement},00 €</h3>
                </div>
            }
            <div>
                <EditAdd add={showCreateTransaction} edit={switchEdit} editActive={edit} addActive={addActive} />
                <CreateTransaction ref={refCreateTransaction} hideCreateTransaction={hideCreateTransaction} />
            </div>
            {currentCustomer === undefined &&
                <p><span>{name}</span> n'est pas un client connu</p>
            }
            {customerTransactions !== undefined &&
                <div className="transactions-list" ref={tableTransaction}>
                    <h4>Transactions</h4>
                    <ListTransactions transactions={customerTransactions} edit={edit} doubleClick={editTransaction} />
                </div>
            }
            <EditTransaction transaction={transactionToEdit} ref={refEditTransaction} />
        </div>
    );
}

export default DetailCustomer;