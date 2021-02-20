const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const database = require('./database');


const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methode', 'GET,PUT,POST,DELETE');
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

app.post('/customers', (req, res) => {
    console.log(req.body.name);
    res.send('Ajouter : ' + req.body)

    database.query("INSERT INTO customers VALUES ('"+ req.body.name + "','"+ req.body.email +"')", (err) => {
        if(err) {
            console.log(err);
        } else {
            res.send('index', { title: 'Data saved', message: 'Data saved successfully.'})
        }
    });
})




app.listen(3001);