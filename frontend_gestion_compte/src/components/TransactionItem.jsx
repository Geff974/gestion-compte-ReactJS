import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionErase } from '../Redux/Transaction/actionTransaction';

import { MdArrowDownward, MdArrowUpward } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import '../styles/TransactionItem.css';
import axios from 'axios';

const TransactionItem = ({ transaction, edit = false }) => {

    const signAmount = transaction.amount > 0 ? 'positive' : 'negative';
    const customers = useSelector(state => state.customers.customers);
    const dispatch = useDispatch();
    const [erased, setErased] = useState('');
    const [eraseMode, setEraseMode] = useState('');

    useEffect(() => {
        if (edit) {
            setEraseMode('erase-mode');
        } else {
            setEraseMode('');
            setErased('');
        }
    }, [edit])

    const dateSlice = (str) => {
        const strSplit = str.split('-');
        const strFinal = strSplit[2] + '/' + strSplit[1];
        return strFinal;
    }

    const eraseTransaction = () => {
        const id_customer = customers.find(cust => cust.name === transaction.name);
        const transactionToDelete = {
            id_customer: id_customer.id,
            id_transaction: transaction.id
        };
        axios.delete(process.env.REACT_APP_API_URL + '/transactions', {
            data: { source: transactionToDelete }
        })
            .then(() => {
                dispatch(transactionErase(transaction.id));
                setErased('erased');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className={`transaction-item-component ${eraseMode} ${erased}`}>
            <div className="transaction-item">
                <div className={`trans-item-icon ${signAmount}`}>
                    {transaction.amount > 0 ? <MdArrowUpward size={22} /> : <MdArrowDownward size={22} />}
                </div>

                <div className="trans-item-info">
                    <h4>{transaction.name}</h4>
                    <p>{transaction.designation}</p>
                </div>

                <div className="trans-item-date-amount">
                    <p className="trans-date">{dateSlice(transaction.date)}</p>
                    {transaction.amount > 0 ? <h4>+ {transaction.amount},00 €</h4> : <h4 className="amount-negative">- {-transaction.amount},00 €</h4>}
                </div>
            </div>
            <div className="transaction-erase-bloc">
                <RiDeleteBin5Line size={30} onClick={eraseTransaction} />
            </div>
        </div>
    );
};

export default TransactionItem;