import React, { useState, useEffect } from 'react'
import { MdDeleteForever } from 'react-icons/md';
import CreateTransaction from './CreateTransaction';
// import { deleteTransaction, getTransactions } from '../services/transactionsService';
import Title from './Title';

const Transactions = () => {

    const [transactions, setTransactions] = useState([])
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/transactions')
            .then(res => res.json())
            .then(res => setTransactions(res))
    }, [update])

    const deleteTransaction = (transaction) => {
        const requestOption = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: transaction.id })
        };
        fetch(process.env.REACT_APP_API_URL + '/transactions', requestOption)
        setUpdate(update + 1);
    }

    const dateSlice = (str) => {
        return str.slice(5)
    }

    return (
        <div className="container">
            <Title title='Transactions' />
            <CreateTransaction setUpdate={setUpdate.bind(this)} update={update} />
            <div className="mx-3 col-12 table-responsive">
                <table className="table table table-hover align-middle">
                    <thead>
                        <tr>
                            <th className="pers">Date</th>
                            <th>Client</th>
                            <th>designation</th>
                            <th>Montant</th>
                            <th></th>
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
                                        <td><button onClick={() => deleteTransaction(transaction)} className="btn btn-danger"><MdDeleteForever /></button></td>
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
