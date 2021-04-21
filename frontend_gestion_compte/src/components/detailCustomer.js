import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import '../styles/detailCustomer.css';
import CreateTransaction from './CreateTransaction';

const DetailCustomer = () => {
    
    const customers = useSelector(state => state.customers.customers)
    const transactions = useSelector(state => state.transactions.transactions)
    const user = useSelector(state => state.user.info);
    let history = useHistory();
    useEffect(() => {
        if (user.id === null) {
            history.push('/login');
        }
    }, [])

    const { name } = useParams();
    const [currentCustomer, setCurrentCustomer] = useState('');
    const [customerTransactions, setCustomerTransactions] = useState([]);
    const [colorText, setColorText] = useState('');
    let indexOfCustomer = '';

    useEffect(() => {
        indexOfCustomer = customers.findIndex(cust => cust.name === name);
        setCurrentCustomer(customers[indexOfCustomer]);
        balanceSign(currentCustomer);
    }, [])

    useEffect(() => {
        transactions.map(trans => {
            console.log(currentCustomer.name);
            if(trans.name === currentCustomer.name) {
                setCustomerTransactions([...customerTransactions, trans]);
            }
        });
    }, [currentCustomer]);


    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_URL + `/customers/${name}`).then((response) => {
    //         return response.json();
    //     }).then((response) => {
    //         setCustomer(response[0]);
    //         balanceSign(response[0]);
    //         fetch(process.env.REACT_APP_API_URL + `/transactions/${response[0].id}`).then((response) => {
    //             return response.json();
    //         }).then((response) => {
    //             setTransactions(response);
    //         })
    //     })
    // }, [name, update])

    const balanceSign = (customer) => {
        const balance = customer.facture + customer.paiement;
        console.log(balance);
        if (balance < 0) {
            setColorText('negative');
        } else {
            setColorText('positive');
        }
    }


    return (
        <div>
            {currentCustomer !== undefined &&
                <div>
                    <h2 className="customerTitle">{(currentCustomer) ? currentCustomer.name : <p>Chargement...</p>}</h2>
                    <h3 className={`balance ${colorText}`}>Balance : {currentCustomer.facture + currentCustomer.paiement},00 €</h3>
                </div>
            }
            {currentCustomer === undefined &&
                <p><span>{name}</span> n'est pas un client connu</p>
            }
            {customerTransactions !== undefined &&
                <div className="container">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>designation</th>
                                <th>Montant</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerTransactions.map((transaction, k) => {
                                return (
                                    <tr key={k}>
                                        <td> {transaction.date} </td>
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
            <CreateTransaction customerDefault={currentCustomer} />
        </div>
    );
}

export default DetailCustomer;