const mysql = require('mariadb')
const db = mysql.createConnection({
host: "localhost",
user: "worker",
password: "worker_password",
database:"mini_university" 
})

module.exports = db;