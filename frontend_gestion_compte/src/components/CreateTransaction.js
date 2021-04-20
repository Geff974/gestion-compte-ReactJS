import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateTransaction = ({ customerDefault }) => {

    const customers = useSelector(state => state.customers.customers);
    console.log(customers);
    const user = useSelector(state => state.user.info);

    const [transactionToAdd, setTransactionToAdd] = useState({
        date: '',
        customer: '',
        designation: '',
        amount: 0,
        id_user: user.id
    });

    const changeHandler = e => {
        console.log(e.target.name);
        console.log(e.target.value);
        if (e.target.name === 'date') {
            setTransactionToAdd({ ...transactionToAdd, date: e.target.value.toLocaleString() });
        } else {
            setTransactionToAdd({ ...transactionToAdd, [e.target.name]: e.target.value });
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/transactions', transactionToAdd)
            .then(() => {
                const reinitState = {
                    date: '',
                    customer: '',
                    designation: '',
                    amout: 0,
                    id_user: user.id
                };
                setTransactionToAdd(reinitState);
            })
            .catch(err => alert(err));
    }

    const testBtn = () => {
        // console.log(transactionToAdd);
    }

    const { date, customer, designation, amount } = transactionToAdd;
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
                        { customerDefault !== undefined &&
                            <input type="text" className="form-control" name="customer" value={customer} disabled/>
                        }

                        { customerDefault === undefined &&
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
                        <button type='submit' className="btn btn-success px-5">Ajouter</button>
                        <button type='button' onClick={testBtn} className="btn btn-info px-5">Info</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateTransaction;