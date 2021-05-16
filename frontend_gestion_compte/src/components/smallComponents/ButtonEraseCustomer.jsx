import React from 'react';
import { useDispatch } from 'react-redux';
import { customerErase } from '../../Redux/Customer/actionCustomer';
import { MdDeleteForever } from 'react-icons/md';

import axios from 'axios';

const ButtonEraseCustomer = ({ customer }) => {

    const dispatch = useDispatch();

    const eraseCustomer = () => {
        axios.delete(process.env.REACT_APP_API_URL + '/transactions', {
            data: { source: customer }
        })
            .then(() => dispatch(customerErase(customer)))
            .catch(err => console.log(err))
    }

    return (
        <button onClick={eraseCustomer} className="btn btn-danger"><MdDeleteForever /></button>
    );
};

export default ButtonEraseCustomer;