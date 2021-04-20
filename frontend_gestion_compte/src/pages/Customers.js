import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreateCustomer from '../components/CreateCustomer';
import Title from '../components/Title';
import { Link } from 'react-router-dom';
import '../styles/Customers.css';
import axios from 'axios';

const Customers = () => {

    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const customers = useSelector(state => state.customers.customers)

    const EraseCustomer = (customer) => {
        axios.post(process.env.REACT_APP_API_URL + '/customers', customer)
        .then((response) => console.log(response.data))
        .catch((err) => alert('Une erreur est survenue : ' + err));
    }

    return (
        <div className="container-fluid">
            <Title title='Clients' />
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Facture</th>
                            <th>Paiement</th>
                            <th>Balance</th>
                            <th></th>
                        </tr>
                    </thead>
                    {customers !== '' &&
                        <tbody>
                            {customers.map((customer, k) => {
                                return (
                                    <tr key={k}>
                                        <td><Link className="nav-link" to={`/customers/${customer.name}`}> {customer.name} </Link></td>
                                        <td><Link className="nav-link" to={`/customers/${customer.name}`}> {customer.facture} </Link></td>
                                        <td><Link className="nav-link" to={`/customers/${customer.name}`}> {customer.paiement} </Link></td>
                                        <td><Link className="nav-link" to={`/customers/${customer.name}`}> {customer.facture + customer.paiement},00 € </Link></td>
                                        <td><button onClick={() => EraseCustomer(customer)} className="btn btn-danger">Effacer</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    }
                </table>
            </div>
            <h3 className="container ms-5 mt-5">Ajouter un client</h3>
            <div>
                <CreateCustomer />
            </div>
        </div>
    );
};

export default Customers;