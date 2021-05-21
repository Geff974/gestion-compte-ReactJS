import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { customerErase } from '../../Redux/Customer/actionCustomer';
import { MdDeleteForever } from 'react-icons/md';
import { useHistory } from 'react-router';

import axios from 'axios';

const ButtonEraseCustomer = ({ customer }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [erased, setErased] = useState(false);

    const eraseCustomer = () => {
        axios.delete(process.env.REACT_APP_API_URL + '/customers', {
            data: { source: customer }
        })
            .then(() => {
                dispatch(customerErase(customer));
                setErased(true);
            })
            .catch(err => console.log(err))
        history.push('/customers');
    }

    return (
        <div className="button-erase">
            {!erased &&
                <button onClick={eraseCustomer} className="btn btn-danger"><MdDeleteForever /></button>
            }
            {erased &&
                <p className="erased_notifier"> Effacé </p>
            }
        </div>
    );
};

export default ButtonEraseCustomer;