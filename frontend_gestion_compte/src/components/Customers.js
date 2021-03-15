import React from 'react';
import CreateCustomer from './CreateCustomer';
import Title from './Title';
import { useHistory } from 'react-router-dom';

const Customers = ({customers, updateCustomers}) => {

    console.log('updateCustomers : ');
    console.log(updateCustomers);
    let history = useHistory();

    const EraseCustomer = (customer) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: customer.name })
        };
        fetch(process.env.REACT_APP_API_URL + '/customers', requestOptions)
            .then(() => {
                alert("'" + customer.name + "' à été effacé avec succés !");
            })
        updateCustomers(customers)
    }

    const showCustomer = (customer) => {
        history.push('/customers/' + customer.name);
    }

    const updateAfterAddCustomer = () => {
        updateCustomers(customers);
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
                        {customers !== '' &&
                            <tbody>
                                {customers.map((customer, k) => {
                                    return (
                                        <tr key={k}>
                                            <td onClick={() => showCustomer(customer)}> {customer.name} </td>
                                            <td onClick={() => showCustomer(customer)}> {customer.credit} </td>
                                            <td onClick={() => showCustomer(customer)}> {customer.debit} </td>
                                            <td onClick={() => showCustomer(customer)}> {customer.debit + customer.credit},00 € </td>
                                            <td><button onClick={() => EraseCustomer(customer)} className="btn btn-danger">Effacer</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        }
                    </table>

                    <h3 className="container ms-5 mt-5">Ajouter un client</h3>
                    <div>
                        <CreateCustomer updateAfterAddCustomer={() => updateAfterAddCustomer} customers={customers} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;