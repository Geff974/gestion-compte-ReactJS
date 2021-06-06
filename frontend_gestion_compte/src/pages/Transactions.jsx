import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import CreateTransaction from '../components/CreateTransaction.jsx';
import { useSelector } from 'react-redux';

import '../styles/Transactions.css';
import EditTransaction from '../components/EditTransaction';
import { ReactComponent as HeaderImg } from '../styles/img/header-transaction.svg';
import EditAdd from '../components/smallComponents/EditAdd.jsx';
import ListTransactions from '../components/ListTransactions.jsx';

const Transactions = () => {

    const refEditTransaction = useRef(null);
    const refCreateTransaction = useRef(null);
    const tableTransaction = useRef(null);
    let history = useHistory();


    const transactions = useSelector(state => state.transactions.transactions);
    const [edit, setEdit] = useState(false);
    const [addActive, setAddActive] = useState(false)
    const [transactionToEdit, settransactionToEdit] = useState({ id: 0, date: "2017-03-11", name: 0, designation: 'Aucune', amount: 0 })

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
        <div className="transactions-component">
            <h1 className="title-component"> <AiOutlineLeftCircle size={30} className="header-backward" onClick={goToHome} /> Transactions</h1>
            <div className="header-component">
                <HeaderImg className="header-img" />
            </div>
            <div>
                <EditAdd add={showCreateTransaction} edit={switchEdit} editActive={edit} addActive={addActive} />
                <CreateTransaction ref={refCreateTransaction} hideCreateTransaction={hideCreateTransaction} />
            </div>
            <div className="transactions-list" ref={tableTransaction}>
                <div className="transactions-title">
                    <h4>Liste des transaction</h4>
                </div>
                <div>
                    {transactions !== undefined &&
                        <div>
                            <ListTransactions transactions={transactions} edit={edit} doubleClick={editTransaction} />
                        </div>
                    }
                </div>
            </div>
            <EditTransaction transaction={transactionToEdit} ref={refEditTransaction} />
        </div>
    )
}

export default Transactions
