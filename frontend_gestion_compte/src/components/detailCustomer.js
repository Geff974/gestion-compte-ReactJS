import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detailCustomer.css';
import CreateTransaction from './CreateTransaction';

const DetailCustomer = () => {

    const { name } = useParams();
    const [update, setUpdate] = useState(0)
    const [currentCustomer, setCustomer] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [colorText, setColorText] = useState('');

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/customers/${name}`).then((response) => {
            return response.json();
        }).then((response) => {
            setCustomer(response[0]);
            balanceSign(response[0]);
            fetch(process.env.REACT_APP_API_URL + `/transactions/${response[0].id}`).then((response) => {
                return response.json();
            }).then((response) => {
                setTransactions(response);
            })
        })
    }, [name, update])

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
            {transactions !== undefined &&
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
                            {transactions.map((transaction, k) => {
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
            <CreateTransaction customer={name} />
        </div>
    );
}

export default DetailCustomer;