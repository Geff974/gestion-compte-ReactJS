import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailCustomer = () => {

    const { name } = useParams();
    const [currentCustomer, setCustomer] = useState('');
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentCustomer: {}
    //     };
    //     const { nameParams } = this.props.params.name;
    // }

    // filtreCustomer(customers) {
    //     const cust = customers.find(el => el.name === this.props.customer);
    //     this.setState({ currentCustomer: cust ? cust : { name: 'Aucune correspondance !' } })
    // }

    useEffect(() => {
        console.log('nameCustomer : ' + name);
        fetch('http://localhost:3001/customers/' + name).then((response) => {
            return response.json();
        }).then((response) => {
            // this.filtreCustomer(response);
            setCustomer(response[0]);
        })
    }, [currentCustomer])


        return (
            <div>
                <h2>{(currentCustomer.name) ? currentCustomer.name : <p>Chargement...</p>}</h2>
            </div>
        );
    }

export default DetailCustomer;