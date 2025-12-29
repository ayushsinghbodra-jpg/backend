// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

//here we dont need to use path module to serve static html files because we are using ejs templating engine to render dynamic html pages

// Local Module
//importing registeredHomes array from hostRouter to display the list of registered homes on the home page
const { registeredHomes } = require('./hostRouter');

userRouter.get("/", (req, res, next) => {
  //registeredHomes array contains the list of homes added by hosts
  console.log(registeredHomes);
  //res.render() method is used to render a view template whereas res.sendFile() is used to send a static file as response
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
  //in this we are passing 'home' to show in which ejs file we want to render the view and passing registeredHomes array to the ejs file to display the list of homes and also passing pageTitle to set the title of the page
  //the order of parameters in res.render() is important first we pass the view file name and then the data object
});

module.exports = userRouter;
