const mysql = require('mysql2');
const dotenv = require('dotenv');
const { exit } = require('process');

dotenv.config();

const host = process.env.HOST_MYSQL || 'localhost';
const user = process.env.USER_MYSQL || 'root';
const password =  process.env.PASSWD_MYSQL || ' ';
const database= process.env.DB_NAME || 'interator-db';

const url = `myslq://${user}:${password}@${host}/${database}`;


const connection = mysql.createPool(url);

  if (!connection) {
    console.log("Error when we connect to database!");
    process.exit(1);
  }

  module.exports =  connection;