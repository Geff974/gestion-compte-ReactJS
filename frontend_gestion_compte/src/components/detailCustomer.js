import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailCustomer = () => {

    const { name } = useParams();
    const [currentCustomer, setCustomer] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/customers/${name}`).then((response) => {
            return response.json();
        }).then((response) => {
            setCustomer(response[0]);
            fetch(process.env.REACT_APP_API_URL + `/transactions/${response[0].id}`).then((response) => {
                return response.json();
            }).then((response) => {
                setTransactions(response);
            })
        })
    }, [name])


    return (
        <div>
            {currentCustomer !== undefined &&
                <div>
                    <h2>{(currentCustomer) ? currentCustomer.name : <p>Chargement...</p>}</h2>
                    <h3>Debit : {currentCustomer.debit}</h3>
                    <h3>Credit : {currentCustomer.credit}</h3>
                    <h3>{currentCustomer.email}</h3>
                </div>
            }
            {currentCustomer === undefined &&
                <p><span>{name}</span> n'est pas un client connu</p>
            }
            {transactions !== undefined &&
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Client</th>
                            <th>designation</th>
                            <th>Montant</th>
                            <th></th>
                        </tr>
                    </thead>
                        <tbody>
                            {transactions.map((transaction, k) => {
                                return (
                                    <tr key={k}>
                                        <td> {transaction.date} </td>
                                        <td> {transaction.name} </td>
                                        <td> {transaction.designation} </td>
                                        <td> {transaction.amount},00 € </td>
                                        <td><button className="btn btn-danger">Effacer</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                </table>
            </div>
            }
        </div>
    );
}

export default DetailCustomer;
// FC6YX-D4FJK-6243W-P3KTG-BRT8W