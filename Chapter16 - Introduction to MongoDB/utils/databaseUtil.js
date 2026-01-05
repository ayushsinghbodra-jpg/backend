//this file will help us connect to mongo database which is a NoSQL database
const mongo = require('mongodb');

//getting MongoClient from mongodb package4
//mongo.MongoClient is used to connect to a mongo database server
const MongoClient = mongo.MongoClient;

//giving the URL of the mongo database server
const MONGO_URL = "mongodb+srv://root:root@projects.gcju5uc.mongodb.net/?appName=projects";

//this is where we will store the database connection
let _db;


//this has to be callback function because connecting to database is an async operation
const mongoConnect = (callback) => {
  //connecting to mongo database server
  //this is promise based API so we can use .then and .catch
  MongoClient.connect(MONGO_URL)
  .then(client => {
    //invoking the callback function after successful connection if you will not write this then the server will start before connecting to database 
    callback();
    //storing the connected database to _db variable
    _db = client.db('airbnb');
  }).catch(err => {
    console.log('Error while connecting to Mongo: ', err);
  });
}

//a call-back function to get the connected database since it returns the _db variable to the other files
const getDB = () => {
  if (!_db) {
    throw new Error('Mongo not connected');
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;