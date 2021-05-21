import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import '../styles/Customers.css';
import CustomerInfo from '../components/CustomerInfo';
import CreateCustomer from '../components/CreateCustomer';
import { MdModeEdit } from 'react-icons/md';

import { ReactComponent as HeaderImg } from '../styles/img/header-customer.svg'
import EditAdd from '../components/smallComponents/EditAdd';

const Customers = () => {

    const customers = useSelector(state => state.customers.customers);
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const refCreateCustomer = useRef(null);
    const customersList = useRef(null);

    const [editCustomer, setEditCustomer] = useState(false);
    const [activeBtnEdit, setActiveBtnEdit] = useState('')

    const goToCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    const showCreateCustomer = () => {
        refCreateCustomer.current.className = 'create-customer show';
        // customersList.current.className = 'customers-list put-down';
    }

    const hideCreateCustomer = () => {
        refCreateCustomer.current.className = 'create-customer';
        // customersList.current.className = 'customers-list';
    }

    const switchEditCustomer = () => {
        editCustomer === true ? setActiveBtnEdit('') : setActiveBtnEdit('btn-edit-active');
        setEditCustomer(!editCustomer);
    }

    return (
        <div className="customers-component">
            {/* <div className="header-customers">
                <h1>Clients</h1>
                <button type="button" onClick={showCreateCustomer} className="btn-create-customer">+ Client</button>
            </div> */}
            <div className="header-customer">
                <HeaderImg className="header-img" />
            </div>
            <div className="customers-bloc">
                <EditAdd add={showCreateCustomer} edit={switchEditCustomer} editActive={editCustomer} />
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