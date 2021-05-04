import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { transactionAdd } from '../Redux/Transaction/actionTransaction';
import axios from 'axios';
import '../styles/CreateTransaction.css';
import { customerUpdate } from '../Redux/Customer/actionCustomer';

const CreateTransaction = ({ nameCustomer }) => {   

    const customers = useSelector(state => state.customers.customers);
    const user = useSelector(state => state.user.info);
    const transactions = useSelector(state => state.transactions.transactions)
    const dispatch = useDispatch();
    const [currentCustomer, setCurrentCustomer] = useState({name: ''});

    const [transactionToAdd, setTransactionToAdd] = useState({
        date: '',
        customer: '',
        designation: '',
        amount: 0,
        id_user: user.id
    });

    useEffect(() => {
        if (nameCustomer) {
            const indexOfCustomer = customers.findIndex(cust => cust.name === nameCustomer);
            setCurrentCustomer(customers[indexOfCustomer]);
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
        if (!nameCustomer) {
            transactionSend = transactionToAdd;
        } else {
            transactionSend = { ...transactionToAdd, customer: currentCustomer.id }
        }

        axios.post(process.env.REACT_APP_API_URL + '/transactions', transactionSend)
            .then(() => {
                const customerWhoAdded = customers.find(el => el.id == transactionToAdd.customer);
                delete transactionSend.customer;
                transactionSend = { ...transactionSend, name: customerWhoAdded.name };
                dispatch(transactionAdd(transactionSend));
                dispatch(customerUpdate(transactions, customerWhoAdded.name));
                setTransactionToAdd({
                    ...transactionToAdd,
                    customer: '',
                    designation: '',
                    amout: 0,
                    id_user: user.id
                });
            })
            .catch(err => alert(err));
    }

    const test = () => {
        const index = customers.findIndex(cust => cust.id == transactionToAdd.customer);
        dispatch(customerUpdate(transactions, customers[index].name));
    }

    const { date, customer, designation, amount } = transactionToAdd;
    
    const disableAdd = date === "" || customer === "" || amount === null ? true : false;

    return (
        <div className="row">
            <form onSubmit={submitHandler} className="my-5">
                <div className="input-group align-items-end col-sm-12">
                    <div className="col-6 pe-1">
                        <label htmlFor="date" className="form-label mx-3">Date : </label>
                        <input type="date" name='date' className="form-control" value={date} onChange={changeHandler} min="2019-01-01" max="2021-12-31" />
                    </div>

                    <div className="col-6 ps-1">
                        <label htmlFor="customer" className="form-label mx-3">Client : </label>
                        { nameCustomer !== undefined &&
                            <input type="text" className="form-control" name="customer" value={currentCustomer.name} disabled/>
                        }

                        { nameCustomer === undefined &&
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

                    <div className="col-6 mt-3 pe-1">
                        <label htmlFor="designation" className="form-label mx-3">Designation : </label>
                        <input type="text" name='designation' className="form-control" value={designation} onChange={changeHandler} />
                    </div>

                    <div className="col-6 ps-1">
                        <label htmlFor="amount" className="form-label mx-3">Montant : </label>
                        <input type="number" name='amount' className="form-control" value={amount} onChange={changeHandler} />
                    </div>

                    <div className="mx-auto mt-3">
                        <button type='submit' className="btn btn-success px-5" disabled={disableAdd}>Ajouter</button>
                    </div>
                    <div className="mx-auto mt-3">
                        <button type='button' onClick={test} className="btn btn-success px-5">Test</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateTransaction;