import React from 'react';

export default React.createContext({
    auth: false,
    user: {
        id: 0,
        username: '',
        email: ''
    },
    customers: [{
        id: 0,
        name: '',
        facture: 0,
        paiement: 0,
        email: '',
        id_user: 0,
    }],
    transactions: [{
        id: 0,
        date: '',
        name: '',
        designation: '',
        amount: ''
    }],

    setAuth: (auth) => { },
    setUser: (user) => { },
    setTransactions: (transaction) => { },
    setCustomers: (customer) => { }
})