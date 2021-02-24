import React, { useState, useEffect } from 'react'
import CreateTransaction from './CreateTransaction';
// import { deleteTransaction, getTransactions } from '../services/transactionsService';
import Title from './Title';

const Transactions = () => {

    const [transactions, setTransactions] = useState([])
    const [update, setUpdate] = useState(0)

    useEffect(() => {
        fetch('http://localhost:3001/transactions')
            .then(res => res.json())
            .then(res => setTransactions(res))
        console.log(transactions)
    }, [update])

    const deleteTransaction = (transaction) => {
        const requestOption = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: transaction.id })
        };
        fetch('http://localhost:3001/transactions', requestOption)
        setUpdate(update + 1);
    }

    return (
        <div className="container">
            <Title title='Transactions' />
            <CreateTransaction setUpdate={setUpdate.bind(this)} update={update} />
            <div className="mx-3">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
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
                                        <td> {transaction.date} </td>
                                        <td> {transaction.name} </td>
                                        <td> {transaction.designation} </td>
                                        <td> {transaction.amount},00 € </td>
                                        <td><button onClick={() => deleteTransaction(transaction)} className="btn btn-danger">Effacer</button></td>
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
