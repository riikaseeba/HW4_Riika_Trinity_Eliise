 // database.js
 const Pool = require('pg').Pool;
 const pool = new Pool({
     user: "postgres",
     password: "sql",//"[add your password here]",
     database: "homework4_WAD",
     host: "localhost",
     port: "5432"
 });
 
 module.exports = pool;