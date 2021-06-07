import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { customerAdd } from '../Redux/Customer/actionCustomer';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import '../styles/CreateCustomer.css';
import UserContext from '../context/UserContext';

const CreateCustomer = React.forwardRef((props, ref) => {

    const userContext = useContext(UserContext);
    const user = useSelector(state => state.user.info);

    const dispatch = useDispatch();

    const [customer, setCustomer] = useState({
        nameCustomer: '',
        email: '',
        id_user: user.id
    })

    const changeHandler = e => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/customers', customer)
            .then((res) => {
                dispatch(customerAdd(res.data));
                setCustomer({ nameCustomer: '', email: '', id_user: user.id });
                userContext.customers.push(res.data);
                props.hideCreateCustomer();
            })
            .catch(err => alert(err));
    }

    const { nameCustomer, email } = customer;

    const disabledAdd = nameCustomer === "" ? true : false;

    return (
        <div className="create-customer" ref={ref}>
            <div className="container">
                <div className="CC-title">
                    <h3>Ajouter un client</h3>
                </div>
                <form onSubmit={submitHandler}>

                    <div className="CC-item name">
                        <label htmlFor="nameCustomer">Nom</label>
                        <input type="text" name="nameCustomer" placeholder="Nom du client" value={nameCustomer} onChange={changeHandler} />
                    </div>

                    <div className="CC-item email">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" placeholder="exemple@mail.com" value={email} onChange={changeHandler} />
                    </div>

                    <button type="submit" className="CC-btn btn-add" disabled={disabledAdd}>Ajouter</button>
                    <button type="button" className="CC-btn btn-cancel" onClick={props.hideCreateCustomer}>Annuler</button>
                </form>
            </div>
        </div>
    );
})

export default CreateCustomer;