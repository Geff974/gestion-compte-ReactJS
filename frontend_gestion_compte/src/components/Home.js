import React from 'react';
import QuickViewCustomer from './QuickViewCustomer';
import '../styles/Home.css';
import { useHistory } from 'react-router-dom';

function Home({ customers }) {

    let history = useHistory();

    const ShowCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    return (
        <div className="container-fluid">
            {customers !== undefined &&
                <div>
                    {customers.map((customer, i) => {
                        return (<QuickViewCustomer customer={customer} key={i} onClick={() => ShowCustomer(customer)} />)
                    })}
                </div>
            }
        </div>
    )
}


export default Home;