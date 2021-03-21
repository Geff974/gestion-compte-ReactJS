import React, { useState, useEffect } from 'react'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import CreateTransaction from './CreateTransaction';
import Title from './Title';

const Transactions = ({ updateCustomers }) => {

    const [transactions, setTransactions] = useState([])
    const [update, setUpdate] = useState(0)
    const [edit, setEdit] = useState(false)

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
        .then(() => {
            setUpdate(update + 1);
            updateCustomers();
        })
    }

    const updateState = () => {
        setUpdate(update + 1);
        updateCustomers();
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
        <div className="container-fluid">
            <Title title='Transactions' />
            <CreateTransaction updateState={updateState.bind(this)}/>
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
