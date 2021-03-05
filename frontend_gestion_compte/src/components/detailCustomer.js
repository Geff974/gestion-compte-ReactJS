import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailCustomer = () => {

    const { name } = useParams();
    const [currentCustomer, setCustomer] = useState('');

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/customers/${name}`).then((response) => {
            return response.json();
        }).then((response) => {
            setCustomer(response[0]);
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
        </div>
    );
}

export default DetailCustomer;
// FC6YX-D4FJK-6243W-P3KTG-BRT8W