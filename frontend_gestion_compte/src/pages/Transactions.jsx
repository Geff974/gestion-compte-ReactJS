import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import CreateTransaction from '../components/CreateTransaction';
import { useSelector } from 'react-redux';

import '../styles/Customers.css';

const Transactions = () => {

    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const transactions = useSelector(state => state.transactions.transactions)
    const [edit, setEdit] = useState(false)

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

    return (
        <div className="transactions-component">
            <div className="header-transactions">
                <h1>Transactions</h1>
            </div>
            <CreateTransaction />
            <div className="text-right">
                <button className="btn btn-secondary" onClick={switchEdit}> <MdModeEdit /> </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped align-middle">
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
                                    <tr key={k}>
                                        <td> {dateSlice(transaction.date)} </td>
                                        <td> {transaction.name} </td>
                                        <td> {transaction.designation} </td>
                                        <td> {transaction.amount} € </td>
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
        </div>
    )
}

export default Transactions
