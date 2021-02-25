import React, { useState, useEffect } from 'react';
import CreateCustomer from './CreateCustomer';
import Title from './Title';
import ShowCustomer from './ShowCustomer';

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        fetchCustomers();
    }, [counter])



    const fetchCustomers = () => {
        fetch(process.env.REACT_APP_API_URL + '/customers').then((response) => {
            return response.json();
        }).then((response) => {
            setCustomers(response);
        })
    }

    const EraseCustomer = (customer) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: customer.name })
        };
        console.log(requestOptions);
        fetch(process.env.REACT_APP_API_URL + '/customers', requestOptions)
            .then((data) => {
                alert("'" + customer.name + "' à été effacé avec succés !");
                console.log('data : ' + data);
            })
        setCounter(counter + 1);
    }

    return (
        <div className="container">
            <div className="row">
                <Title title='Clients' />
                <div className="offset-1 col-10">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Crédit</th>
                                <th>Débit</th>
                                <th>Balance</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, k) => {
                                return (
                                    <tr key={k} onClick={() => ShowCustomer(customer)}>
                                        <td> {customer.name} </td>
                                        <td> {customer.credit} </td>
                                        <td> {customer.debit} </td>
                                        <td> {customer.credit - customer.debit},00 € </td>
                                        <td><button onClick={() => EraseCustomer(customer)} className="btn btn-danger">Effacer</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <h3 className="container ms-5 mt-5">Ajouter un client</h3>
                    <div>
                        <CreateCustomer setCounter={setCounter.bind(this)} counter={counter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;