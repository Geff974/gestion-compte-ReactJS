import React from 'react';
import QuickViewCustomer from './QuickViewCustomer';
import '../styles/Home.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userInfo } from '../Redux/User/actionUser';
import axios from 'axios';

function Home() {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    let customers = [];

    const loadCustomers = () => {
        axios.get(process.env.REACT_APP_API_URL + '/customers', { id: user.id })
            .then((response) => console.log(response));
    }

    let history = useHistory();

    // const ShowCustomer = (customer) => {
    //     history.push('/customers/' + customer.name);
    // }

    return (
        <div className="container-fluid">
            <button onClick={loadCustomers}>Charger CLIENTS</button>
            {customers !== undefined &&
                <div>
                    {customers.map((customer, i) => {
                        // return (<QuickViewCustomer customer={customer} key={i} onClick={() => ShowCustomer(customer)} />)
                        return (<QuickViewCustomer customer={customer} key={i} />)
                    })}
                </div>
            }
        </div>
    )
}


export default Home;