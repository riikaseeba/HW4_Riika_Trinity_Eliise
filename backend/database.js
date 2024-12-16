 const Pool = require('pg').Pool; //setting up a connection to PostgreSQL database

 const pool = new Pool({
     user: "postgres",
     password: "sql",
     database: "homework4_WAD",
     host: "localhost",
     port: "5432"
 });

 const execute = async(query) => {
     try {
         await pool.connect(); // create a connection
         await pool.query(query); // executes the provided query
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
     CREATE TABLE IF NOT EXISTS "posts" (
         id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
         user_id uuid REFERENCES users(id), -- Links to the user's unique ID
         title TEXT, -- Title of the post
         body TEXT NOT NULL, -- The main content of the post
         date_posted TIMESTAMP NOT NULL DEFAULT NOW(),
         date_updated TIMESTAMP
     );
 `;


 execute(createTblQuery) //creates the "users" table.
     .then(result => {
         if (result) {
             console.log('Table "users" is created');
             // After creating users table it can create posts table
             //bcus posts has link to users
             return execute(createPostsTblQuery);
         }
     })
     .then(result => {
         if (result) {
             console.log('Table "posts" is created');
         }
     });

 module.exports = pool;