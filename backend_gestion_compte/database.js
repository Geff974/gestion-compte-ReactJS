const mysql = require('mysql');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     dateStrings: true,
//     database: 'gestionCompte_development'
// });

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dateStrings: true,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if(error) {
        console.log('Error');
    } else {
        console.log('Connected');
    }
})

module.exports = connection;