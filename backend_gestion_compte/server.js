const express = require('express');
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

const updateAccount = (id) => {
    let debit = 0;
    let credit = 0;

    database.query("SELECT * FROM transactions WHERE id_customer = ?", id, (err, rows) => {
        if(!err) {
            rows.map(el => {
               if (el.amount > 0) {
                   debit += el.amount;
               } else {
                   credit += el.amount;
               }
            })
            database.query('UPDATE customers SET debit = ' + debit + ', credit = ' + credit + ' WHERE id = ? ', id, (err, rows) => {
                if (!err) {
                    return 1;
                } else {
                    return 0;
                }
            })
        } else {
            console.log('probleme');
        }
    })
}

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
    database.query("SELECT transactions.id, CAST(`date` AS DATE) AS date, name, designation, amount FROM transactions INNER JOIN customers ON id_customer = customers.id ORDER BY date DESC", (err, rows) => {
        if(!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

app.get('/transactions/:id', (req, res) => {
    database.query("SELECT * FROM transactions WHERE id_customer=?", req.params.id, (err, rows) => {
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

app.post('/transactions', (req, res) => {
    database.query("INSERT INTO transactions (date, id_customer, designation, amount) VALUES ('"+ req.body.date + "','"+ req.body.customer +"','"+ req.body.designation +"','"+ req.body.amount +"')", (err, rows) => {
        if(!err) {
            const updateSuccess = updateAccount(req.body.customer);
            if (updateSuccess === 0) {
                res.status(201).json({ message: 'Transaction create but customer dont update !' });
            } else {
                res.status(201).json({ message: 'Transaction create.' });
            }
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
    database.query("DELETE FROM transactions WHERE id= ?", [req.body.id], (err, rows, fields) => {
        console.log(req.body)
        if (!err) {
            res.status(200).json({ message: 'Deleted successfully' });
        } else {
            console.log(err)
            res.status(400).json({ err })
        }
    })
})





app.listen(3001);