import React from 'react';
import { useSelector } from 'react-redux';
import CreateCustomer from './CreateCustomer';
import Title from './Title';
import { Link } from 'react-router-dom';
import '../styles/Customers.css';
import axios from 'axios';

const Customers = () => {

    // const EraseCustomer = (customer) => {
    //     // TODO: Afficher une alerte info pour la suppression
    //     const requestOptions = {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ name: customer.name })
    //     };
    //     fetch(process.env.REACT_APP_API_URL + '/customers', requestOptions)
    //         .then(() => {
    //             alert("'" + customer.name + "' à été effacé avec succés !");
    //             updateCustomers();
    //         })
    // }

    // const updateAfterAddCustomer = () => {
    //     updateCustomers();
    // }

    const user = useSelector(state => state.user);
    const customers = [];

    const EraseCustomer = (customer) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: customer.name, id_user: user.id })
        };
        axios.post(process.env.REACT_APP_API_URL + '/customers', requestOptions)
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