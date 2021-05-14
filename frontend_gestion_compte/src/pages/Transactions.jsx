import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import CreateTransaction from '../components/CreateTransaction.jsx';
import { useSelector } from 'react-redux';

import '../styles/Transactions.css';
import EditTransaction from '../components/EditTransaction';

const Transactions = () => {

    const refEditTransaction = useRef(null);
    const refCreateTransaction = useRef(null);
    const tableTransaction = useRef(null)
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const transactions = useSelector(state => state.transactions.transactions)
    const [edit, setEdit] = useState(false)
    const [transactionToEdit, settransactionToEdit] = useState({ id: 0, date: "2017-03-11", name: 0, designation: 'Aucune', amount: 0 })

    const editTransaction = (transaction) => {
        settransactionToEdit(transaction);
        refEditTransaction.current.className = "edit-transaction open";
    }

    const deleteTransaction = (transaction) => {
        console.log(transaction);
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
        tableTransaction.current.className = 'table-transactions put-down';
    }

    const hideCreateTransaction = () => {
        console.log('Reussi')
        refCreateTransaction.current.className = 'create-transaction';
        tableTransaction.current.className = 'table-transactions';
    }

    return (
        <div className="transactions-component">
            <div className="header-transactions">
                <h1>Transactions</h1>
                <button type="button" className="btn-create-transaction" onClick={showCreateTransaction}>+ Transaction</button>
            </div>
            <CreateTransaction ref={refCreateTransaction} hideCreateTransaction={hideCreateTransaction} />
            <div className="text-right">
                <button className="btn btn-secondary" onClick={switchEdit}> <MdModeEdit /> </button>
            </div>
            <div className="table-transactions" ref={tableTransaction}>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Client</th>
                            <th>designation</th>
                            <th>Montant</th>
                        </tr>
                    </thead>
                    {transactions !== undefined &&
                        <tbody>
                            {transactions.map((transaction, k) => {
                                return (
                                    <tr key={k} onDoubleClick={() => editTransaction(transaction)}>
                                        <td className="date-table"> {dateSlice(transaction.date)} </td>
                                        <td> {transaction.name} </td>
                                        <td> {transaction.designation} </td>
                                        <td className="amount"> {transaction.amount} € </td>
                                        {edit &&
                                            <td><button onClick={() => deleteTransaction(transaction)} className="btn btn-danger"><MdDeleteForever /></button></td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    }
                </table>
            </div>
            <EditTransaction transaction={transactionToEdit} ref={refEditTransaction} />
        </div>
    )
}

export default Transactions
