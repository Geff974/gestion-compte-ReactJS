import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import '../styles/Customers.css';
import CustomerInfo from '../components/CustomerInfo';
import CreateCustomer from '../components/CreateCustomer';
import { AiOutlineLeftCircle } from 'react-icons/ai';

import { ReactComponent as HeaderImg } from '../styles/img/header-customer.svg'
import EditAdd from '../components/smallComponents/EditAdd';

const Customers = () => {

    const customers = useSelector(state => state.customers.customers);
    let history = useHistory();

    const refCreateCustomer = useRef(null);
    const customersList = useRef(null);

    const [editCustomer, setEditCustomer] = useState(false);
    const [activeAdd, setactiveAdd] = useState(false);

    const goToCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    const showCreateCustomer = () => {
        refCreateCustomer.current.className = 'create-customer show';
        setactiveAdd(true);
    }

    const hideCreateCustomer = () => {
        refCreateCustomer.current.className = 'create-customer';
        setactiveAdd(false);
    }

    const switchEditCustomer = () => {
        setEditCustomer(!editCustomer);
    }

    const goToHome = () => {
        history.push('/');
    }

    return (
        <div className="customers-component">
            <h1 className="title-component"> <AiOutlineLeftCircle size={30} className="header-backward" onClick={goToHome} /> Client</h1>
            <div className="header-component">
                <HeaderImg className="header-img" />
            </div>
            <div>
                <EditAdd add={showCreateCustomer} edit={switchEditCustomer} editActive={editCustomer} addActive={activeAdd} />
                <CreateCustomer ref={refCreateCustomer} hideCreateCustomer={hideCreateCustomer} />
            </div>
            <div ref={customersList} className="customers-list">
                {customers.map((customer, k) => {
                    return (
                        <div key={k} className="customers-customerInfo">
                            <div>
                                <CustomerInfo goToCustomer={goToCustomer} customer={customer} edit={editCustomer} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Customers;