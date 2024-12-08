/* jshint esversion: 11 */

require("dotenv").config();
const mysql = require("mysql2");

// MySQL connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // Replace with your MySQL username
    password: process.env.DB_PASSWORD, // Replace with your MySQL password
    database: process.env.DB_NAME,
}).promise();


module.exports = db;
