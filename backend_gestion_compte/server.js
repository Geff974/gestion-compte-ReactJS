const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

const updateAccount = (id_customer) => {
    let facture = 0;
    let paiement = 0;

    database.query("SELECT * FROM transactions WHERE id_customer = ?", [id_customer], (err, rows) => {
        if (!err) {
            rows.map(el => {
                if (el.amount > 0) {
                    facture += el.amount;
                } else {
                    paiement += el.amount;
                }
            })
            database.query('UPDATE customers SET facture = ' + facture + ', paiement = ' + paiement + ' WHERE id = ? ', id_customer, (err, rows) => {
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

app.get('/test', (req, res) => {
    console.log(req.body.id_user)
    database.query("SELECT * FROM customers WHERE id_user = ?", [req.body.id_user], (err, rows) => {
        if(!err) {
            rows.forEach(customer => {
                updateAccount(customer.id);
            });
            res.send({message: "Mise a jour réussi"});
        } else {
            res.send({error: "Probleme detecté lors de la mise a jour"});
        }
    })
})


// -------------- CREATE --------------

app.post('/api/register', async (req, res) => {
    console.log('enter')
        const hash = await bcrypt.hash(req.body.passwordRegistration, await bcrypt.genSalt(10));
        console.log(req.body);
        database.query('INSERT INTO users (username, email, password) VALUE (?,?,?)', [req.body.usernameRegistration, req.body.emailRegistration, hash], (err, result) => {
            if(err) {
                res.send({err: err});
            } else {
                res.send(result);
            }
        })
    })

app.post('/api/login', (req, res) => {
    database.query("SELECT * FROM users WHERE username=?",
    [req.body.usernameLogin],
    async (err, result) => {
        if(err) {
            res.send({err: err});
        }
        
        if (await bcrypt.compare(req.body.passwordLogin, result[0].password)) {
            res.send(result[0])
        } else {
            res.send({ message: "Wrong username/password combination !" });
        }
    })
})

app.post('/api/customers', (req, res) => {
    database.query("INSERT INTO customers (name, email, id_user) VALUES (?,?,?)", [req.body.nameCustomer, req.body.email, req.body.id_user] , (err, rows) => {
        if (!err) {
            database.query("SELECT * FROM customers WHERE id_user=? ORDER BY id DESC LIMIT 1", [req.body.id_user], (err, rows) => {
                if(!err) {
                    res.send(rows[0]);
                } else {
                    res.send({error: err});
                }
            })
        } else {
            res.send({error: err});
        }
    });
})


app.post('/api/transactions', (req, res) => {
    database.query("INSERT INTO transactions (date, id_customer, designation, amount, id_user) VALUES (?,?,?,?,?)", [req.body.date, req.body.customer, req.body.designation, req.body.amount, req.body.id_user ], (err, rows) => {
        if (!err) {
            updateAccount(req.body.customer);
            database.query("SELECT transactions.id, CAST(`date` AS DATE) AS date, name, designation, amount FROM transactions INNER JOIN customers ON id_customer = customers.id AND transactions.id_user = ? ORDER BY id DESC LIMIT 1",[req.body.id_user], (err, rows) => {
                res.send(rows[0]);
            })
        } else {
            res.send({error: err});
        }
    });
})


// -------------- READ --------------

app.get('/api/updateAll', (req, res) => {
    database.query("SELECT * FROM customers WHERE id_user = ?", [req.body.id_user], (err, rows) => {
        if(!err) {
            rows.forEach(customer => updateAccount(customer.id));
            res.send({message: "Mise a jour réussi"});
        } else {
            res.send({error: "Probleme detecté lors de la mise a jour"});
        }
    })
})

app.get('/api/customers/:id_user', (req, res) => {
    database.query("SELECT * FROM customers WHERE id_user=?",[req.params.id_user] , (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err)
        }
    })
})

app.get('/api/transactions/:id_user', (req, res) => {
    database.query("SELECT transactions.id, CAST(`date` AS DATE) AS date, name, designation, amount FROM transactions INNER JOIN customers ON id_customer = customers.id AND transactions.id_user = ? ORDER BY date DESC", [req.params.id_user] , (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})

app.get('/api/transactions/:id_user/:id_customer', (req, res) => {
    database.query("SELECT * FROM transactions WHERE id_user=? AND id_customer=? ORDER BY date DESC", [req.params.id_user, req.params.id_customer], (err, rows) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
})


// -------------- UPDATE --------------

app.put('/api/transactions', (req, res) => {
    database.query("UPDATE transactions SET designation=? , amount=?, id_customer=?, date=? WHERE id=?", [req.body.designation, req.body.amount, req.body.name, req.body.date, req.body.id], (err, rows) => {
        if(!err) {
            updateAccount(req.body.name);
            database.query("SELECT * FROM transactions WHERE id=?", [req.body.id], (err, row) => {
                if (!err) {
                    res.send(row)
                } else {
                    res.send({ warning: 'Transaction update, but can not send it back. Try log out.'})
                }
            })
        } else {
            res.send({error: err});
        }
    })
})


// -------------- DELETE --------------

app.delete('/api/customers', (req, res) => {
    database.query("DELETE FROM customers WHERE id= ?", [req.body.source.id], (err, rows, fields) => {
        if (!err) {
            res.send('Deleted successfully.');
        } else {
            res.send({error: err});
        }
    })
})

app.delete('/api/transactions', (req, res) => {
        database.query("DELETE FROM transactions WHERE id= ?", [req.body.source.id_transaction], (err, rows, fields) => {
            if (!err) {
                res.status(200).json({message: 'Deleted successfully'});
                updateAccount(req.body.source.id_customer);
            } else {
                console.log(err)
                res.status(400).json({
                    err
                })
            }
        })
})



app.listen(process.env.DB_PORT);