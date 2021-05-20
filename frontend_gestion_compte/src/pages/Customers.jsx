import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import '../styles/Customers.css';
import CustomerInfo from '../components/CustomerInfo';
import CreateCustomer from '../components/CreateCustomer';
import { MdEdit } from 'react-icons/md';
import ButtonEraseCustomer from '../components/smallComponents/ButtonEraseCustomer';

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

    const [editCustomer, setEditCustomer] = useState(false)

    const goToCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    const showCreateCustomer = () => {
        refCreateCustomer.current.className = 'create-customer show';
        customersList.current.className = 'customers-list put-down';
    }

    const hideCreateCustomer = () => {
        refCreateCustomer.current.className = 'create-customer';
        customersList.current.className = 'customers-list';
    }

    const switchEditCustomer = () => {
        setEditCustomer(!editCustomer);
    }

    return (
        <div>
            <div className="header-customers">
                <h1>Clients</h1>
                <button type="button" onClick={showCreateCustomer} className="btn-create-customer">+ Client</button>
            </div>
            <CreateCustomer ref={refCreateCustomer} hideCreateCustomer={hideCreateCustomer} />
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
            <button type="button" onClick={switchEditCustomer}> <MdEdit /> </button>
        </div>
    );
};

export default Customers;