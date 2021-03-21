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
                <div className="col-12 col-md-6">
                    {customers.map((customer, i) => {
                        return (<QuickViewCustomer customer={customer} key={i} onClick={() => ShowCustomer(customer)} className='quickView' />)
                    })}
                </div>
            }
        </div>
    )
}


export default Home;