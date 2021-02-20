const express = require('express');
require('dotenv').config();
const database = require('./database');


const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methode', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Header', 'Content-Type');
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

app.post('/customers', (req, res) => {
    console.log('req : ' + req.params.name);
})




app.listen(3001);