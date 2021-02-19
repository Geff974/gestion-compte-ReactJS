const express = require('express');
require('dotenv').config();
const db = require('./database');


const customers = [
    {
        name: 'MobiOne',
        debit: 1200,
        credit: 1200
    },
    {
        name: 'ProxyCom',
        debit: 300,
        credit: 200
    },
    {
        name: 'SI Informatique',
        debit: 200,
        credit: 170
    }
]

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methode', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Header', 'Content-Type');
    next();
})

console.log('server running');

app.get('/customers', (req, res) => {
    // res.json(customers);

    db.query("SELECT * FROM customers", (err, rows, fileds) => {
        if(!err) {
            res.send(rows);
            console.log(rows);
        } else {
            console.log(err)    
        }
    })
})

app.get('/test', async (req, res) => {
    const rep = await db.promise().query(`SELECT * FROM customers`);
    console.log(rep);
    res.send(200);
})




app.listen(3001);