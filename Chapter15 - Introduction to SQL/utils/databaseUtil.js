//we are creating databse using mysql2 package

const mysql = require('mysql2');

//pool is used to manage multiple database connections efficiently it allows us to reuse connections rather than creating a new one for each request
//the syntax mysql.createPool is used to create a connection pool to the database
//createPool method takes an object as an argument which contains the database connection details like host,user,password and database name
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'airbnb'
});

module.exports = pool.promise();