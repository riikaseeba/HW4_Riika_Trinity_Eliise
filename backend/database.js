 const Pool = require('pg').Pool; //setting up a connection to PostgreSQL database

 const pool = new Pool({
     user: "postgres",
     password: "sql",
     database: "homework4_WAD",
     host: "localhost",
     port: "5432"
 });

 const execute = async(query1, query2) => {
     try {
         await pool.connect(); // create a connection
         await pool.query(query1); // executes the provided query
         await pool.query(query2);
         return true;
     } catch (error) {
         console.error(error.stack);
         return false;
     }
 };

 const createTblQuery = `
     CREATE TABLE IF NOT EXISTS "users" (
         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
         email VARCHAR(200) NOT NULL UNIQUE,
         password VARCHAR(200) NOT NULL
     );`;

     const createPostsTblQuery = `
     CREATE TABLE IF NOT EXISTS "posttable" (
        "id" SERIAL PRIMARY KEY,         
        "body" VARCHAR(200) NOT NULL,
        "post_date" DATE NOT NULL
        );`;


 execute(createTblQuery, createPostsTblQuery) //creates the "users" table.
     .then(result => {
         if (result) {
             console.log('Table "users" is created and Table "posttable" is created');
         }
     })

 module.exports = pool;