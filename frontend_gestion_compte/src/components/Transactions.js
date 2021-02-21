import React, { useState, useEffect } from 'react'
import { deleteTransaction, getTransactions } from '../services/transactionsService';
import Title from './Title';

const Transactions = () => {

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/transactions')
            .then(res => res.json())
            .then(res => setTransactions(res))
    }, [])

    const loadTransactions = () => {
        fetch("http://localhost:3001/transactions").then(response => {
            return response.json()
        }).then(response => {
            setTransactions(response)
        })
    }

    return (
        <div>
            <Title title='Transactions' />
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
                                    {/* FIXME: delete ne fonctionne pas */}
                                    <td><button onClick={() => deleteTransaction(transaction.id), loadTransactions}>Effacer</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                }
            </table>
        </div>
    )
}

export default Transactions
