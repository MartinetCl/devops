const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST_MYSQL || 'localhost',
    user: process.env.USER_MYSQL || 'root',
    password: process.env.PASSWD_MYSQL || ' ',
    database: process.env.DB_NAME || 'iterator-db'
  });

  if (!connection) {
    console.log("Error when we connect to database!")
  }

  module.exports = connection;
