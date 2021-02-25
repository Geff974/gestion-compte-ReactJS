import React, { useState, useEffect } from 'react';
import QuickViewCustomer from './QuickViewCustomer';
import '../styles/Home.css';
import { useHistory } from 'react-router-dom';

function Home() {

    let history = useHistory();

    const [customers, setCustomers] = useState([]);


    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
            return response.json();
        }).then((response) => {
            setCustomers(response);
        })
    }, [])

    const ShowCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    return (
        <div className="container">
            <div className="row">
                {customers.map((customer, i) => {
                    return (<QuickViewCustomer customer={customer} key={i} onClick={() => ShowCustomer(customer)} className='quickView' />)
                })}
            </div>
        </div>
    )
}


export default Home;