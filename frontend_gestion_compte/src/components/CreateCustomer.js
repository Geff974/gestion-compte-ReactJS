import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { customerAdd } from '../Redux/Customer/actionCustomer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

const CreateCustomer = () => {

    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const dispatch = useDispatch();

    const [customer, setCustomer] = useState({
        nameCustomer: '',
        email: '',
        id_user: user.id
    })

    const changeHandler = e => {
        console.log(e);
        console.log(customer);
        setCustomer({...customer, [e.target.name]: e.target.value});
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/customers', customer)
            .then(() => {
                dispatch(customerAdd(user.id));
                setCustomer({ nameCustomer: '', email: '', id_user: user.id});
            })
            .catch(err => alert(err));
    }

    const testRqt = () => {
        console.log(customer);
    }

    const { nameCustomer, email } = customer;
    return (
        <div className="row">
            <form onSubmit={submitHandler} className="mt-4">
                <div className="input-group align-items-end">
                    <div className="col-6 pe1">
                        <label htmlFor="nameCustomer" className="form-label ms-5 me-2">Nom : </label>
                        <input type="text" name='nameCustomer' className="form-control" value={nameCustomer} onChange={changeHandler} />
                    </div>

                    <div className="col-6 pe1">
                        <label htmlFor="email" className="form-label ms-5 me-2">e-mail : </label>
                        <input type="email" name='email' className="form-control" value={email} onChange={changeHandler} />
                    </div>

                    <button type='submit' className="btn btn-success mx-auto mt-3">Ajouter</button>
                    <button type='button' onClick={testRqt} className="btn btn-info mx-auto mt-3">Info</button>
                </div>
            </form>
        </div>
    );
}

export default CreateCustomer;