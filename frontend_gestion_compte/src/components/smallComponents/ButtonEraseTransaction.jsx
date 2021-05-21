import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionErase } from '../../Redux/Transaction/actionTransaction';
import { MdDeleteForever } from 'react-icons/md';
import '../../styles/smallComponents/ButtonErase.css';
import axios from 'axios';

const ButtonEraseTransaction = ({ transaction }) => {

    const customers = useSelector(state => state.customers.customers);
    const dispatch = useDispatch();
    const [erased, setErased] = useState(false)

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
                setErased(true);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="button-erase">
            {!erased &&
                <button onClick={eraseTransaction} className="btn btn-danger"><MdDeleteForever /></button>
            }
            {erased &&
                <p className="erased_notifier"> Effacé </p>
            }
        </div>
    );
};

export default ButtonEraseTransaction;