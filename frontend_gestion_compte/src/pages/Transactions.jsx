import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { MdModeEdit } from 'react-icons/md';
import CreateTransaction from '../components/CreateTransaction.jsx';
import { useSelector } from 'react-redux';

import '../styles/Transactions.css';
import EditTransaction from '../components/EditTransaction';
import ButtonEraseTransaction from '../components/smallComponents/ButtonEraseTransaction.jsx';
import TransactionItem from '../components/TransactionItem.jsx';

const Transactions = () => {

    const refEditTransaction = useRef(null);
    const refCreateTransaction = useRef(null);
    const tableTransaction = useRef(null);
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const transactions = useSelector(state => state.transactions.transactions);
    const [edit, setEdit] = useState(false);
    const [transactionToEdit, settransactionToEdit] = useState({ id: 0, date: "2017-03-11", name: 0, designation: 'Aucune', amount: 0 })

    const editTransaction = (transaction) => {
        settransactionToEdit(transaction);
        refEditTransaction.current.className = "edit-transaction open";
    }

    const dateSlice = (str) => {
        const strSplit = str.split('-');
        const strFinal = strSplit[2] + '/' + strSplit[1];
        return strFinal;
    }

    const switchEdit = () => {
        setEdit(!edit);
    }

    const showCreateTransaction = () => {
        refCreateTransaction.current.className = 'create-transaction show';
        tableTransaction.current.className = 'transactions-list put-down';
    }

    const hideCreateTransaction = () => {
        refCreateTransaction.current.className = 'create-transaction';
        tableTransaction.current.className = 'transactions-list';
    }

    return (
        <div className="transactions-component">
            <div className="header-transactions">
                <h1>Transactions</h1>
                <button type="button" className="btn-create-transaction" onClick={showCreateTransaction}>+ Transaction</button>
            </div>
            <CreateTransaction ref={refCreateTransaction} hideCreateTransaction={hideCreateTransaction} />
            <div className="transactions-list" ref={tableTransaction}>
                <div className="transactions-title">
                    <h4>Liste des transaction</h4>
                    <p className="btn-edit" onClick={switchEdit}> <MdModeEdit /> </p>
                </div>
                <div>
                    {transactions !== undefined &&
                        <div>
                            {transactions.map((transaction, k) => {
                                return (
                                    <div key={k} onDoubleClick={() => editTransaction(transaction)}>
                                        <TransactionItem transaction={transaction} />
                                    </div>
                                    //     {edit &&
                                    //         <td><ButtonEraseTransaction transaction={transaction} /></td>
                                    //     }
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
            <EditTransaction transaction={transactionToEdit} ref={refEditTransaction} />
        </div>
    )
}

export default Transactions
