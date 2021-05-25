import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionAdd } from '../Redux/Transaction/actionTransaction';
import axios from 'axios';
import '../styles/CreateTransaction.css';
import { customerUpdate } from '../Redux/Customer/actionCustomer';
import { MdEuroSymbol } from 'react-icons/md';

const CreateTransaction = React.forwardRef((props, ref) => {

    const customers = useSelector(state => state.customers.customers);
    const user = useSelector(state => state.user.info);
    const transactions = useSelector(state => state.transactions.transactions)
    const dispatch = useDispatch();
    const [currentCustomer, setCurrentCustomer] = useState({ name: '' });

    const [transactionToAdd, setTransactionToAdd] = useState({
        date: '',
        customer: '',
        designation: '',
        amount: 0,
        id_user: user.id
    });

    // useEffect(() => {
    //     if (props.nameCustomer) {
    //         const indexOfCustomer = customers.findIndex(cust => cust.name === props.nameCustomer);
    //         setCurrentCustomer(customers[indexOfCustomer]);
    //     }
    // }, [])

    useEffect(() => {
        if (props.customer) {
            setTransactionToAdd({ ...transactionToAdd, customer: props.customer.id })
        }
    }, [])


    const changeHandler = e => {
        if (e.target.name === 'date') {
            setTransactionToAdd({ ...transactionToAdd, date: e.target.value.toLocaleString() });
        } else {
            setTransactionToAdd({ ...transactionToAdd, [e.target.name]: e.target.value });
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        let transactionSend = {};
        if (!props.nameCustomer) {
            transactionSend = transactionToAdd;
        } else {
            transactionSend = { ...transactionToAdd, customer: currentCustomer.id }
        }

        axios.post(process.env.REACT_APP_API_URL + '/transactions', transactionSend)
            .then((res) => {
                console.log(res);
                dispatch(transactionAdd(res.data));
                dispatch(customerUpdate(transactions, res.data.name));
                setTransactionToAdd({
                    ...transactionToAdd,
                    customer: '',
                    designation: '',
                    amout: 0,
                    id_user: user.id
                });
                props.hideCreateTransaction();
            })
            .catch(err => alert(err));
    }

    const { date, customer, designation, amount } = transactionToAdd;

    const disableAdd = date === "" || customer === "" || amount === null ? true : false;

    return (

        <div className="create-transaction" ref={ref}>
            <div className="container">
                <div className="CT-title">
                    <h3>Ajouter une transaction</h3>
                </div>
                <form onSubmit={submitHandler}>
                    <div className="CT-item designation">
                        <label htmlFor="designation">Designation</label>
                        <input type="text" name="designation" placeholder="Description de la transaction" value={designation} onChange={changeHandler} />
                    </div>

                    <div className="CT-item date">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" value={date} onChange={changeHandler} min="2019-01-01" />
                    </div>

                    <div className="CT-item customer">
                        <label htmlFor="customer">Client</label>
                        {props.nameCustomer !== undefined &&
                            <input type="text" className="form-control" name="customer" value={currentCustomer.name} disabled />
                        }

                        {props.nameCustomer === undefined &&
                            <select className="form-select" name="customer" value={customer} onChange={changeHandler}>
                                <option value=''></option>
                                {customers.map((customer, k) => {
                                    return (
                                        <option key={k} value={customer.id}>{customer.name}</option>
                                    )
                                })}
                            </select>
                        }
                    </div>

                    <div className="CT-item amount">
                        <label htmlFor="amount">Montant</label>
                        <div className="CT-amount-input">
                            <MdEuroSymbol className="euro" />
                            <input type="number" name="amount" placeholder='0' value={amount} onChange={changeHandler} />
                        </div>
                    </div>

                    <button type="submit" className="CT-btn btn-add" disabled={disableAdd}>Ajouter</button>
                    <button type="button" className="CT-btn btn-cancel" onClick={props.hideCreateTransaction}>Annuler</button>
                </form>
            </div>
        </div>

    );
})

export default CreateTransaction;