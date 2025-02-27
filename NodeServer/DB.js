const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}).promise();

module.exports = pool