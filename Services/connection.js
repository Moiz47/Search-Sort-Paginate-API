require("dotenv").config();
const mysql = require('mysql');

const db = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : process.env.MYSQL,
    port     : 3306,
    database : process.env.MYSQLDB,
    timezone:  'UTC'
})

module.exports = db;