import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionErase } from '../../Redux/Transaction/actionTransaction';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

const ButtonEraseTransaction = ({ transaction }) => {

    const customers = useSelector(state => state.customers.customers);
    const dispatch = useDispatch();

    const deleteTransaction = () => {
        const id_customer = customers.find(cust => cust.name === transaction.name);
        const transactionToDelete = {
            id_customer: id_customer.id,
            id_transaction: transaction.id
        };
        axios.delete(process.env.REACT_APP_API_URL + '/transactions', {
            data: { source: transactionToDelete }
        })
            .then(() => dispatch(transactionErase(transaction.id)))
            .catch(err => console.log(err));
    }

    return (
        <button onClick={deleteTransaction} className="btn btn-danger"><MdDeleteForever /></button>
    );
};

export default ButtonEraseTransaction;