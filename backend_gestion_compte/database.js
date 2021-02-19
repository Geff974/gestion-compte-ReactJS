const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestionCompte_development'
});

connection.connect((error) => {
    if(error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
})

module.exports = connection;