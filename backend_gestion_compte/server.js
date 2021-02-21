const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const database = require('./database');


const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

console.log('server running');

app.get('/customers', (req, res) => {
    database.query("SELECT * FROM customers", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err)    
        }
    })
})

app.get('/customers/:name', (req, res) => {
    database.query("SELECT * FROM customers WHERE name = ?", req.params.name, (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err)
        }
    } )
})

app.get('/transactions', (req, res) => {
    database.query("SELECT transactions.id, date, name, designation, amount FROM transactions INNER JOIN customers ON id_customer = customers.id", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

app.post('/customers', (req, res) => {
    database.query("INSERT INTO customers (name, email) VALUES ('"+ req.body.name + "','"+ req.body.email +"')", (err, rows) => {
        if(!err) {
            res.send(req.body.name + ' créé avec succés !');
        } else {
            console.log(err);
        }
    });
})

app.delete('/customers', (req, res) => {
    database.query("DELETE FROM customers WHERE name= ?", [req.body.name], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted successfully.');
        } else {
            console.log(err)
        }
    })
})

app.delete('/transactions', (req, res) => {
    database.query("DELETE FROM transactions WHERE id = ?", [req.body.id], (err, rows, fields) => {
        if(!err) {
            res.send('Deleted successfully.')
        } else {
            console.log(err)
        }
    })
})




app.listen(3001);