//we need to create a separate router for all the routes related to hosting so that our code is modular and organized using this we can easily manage and scale our application
//the basic functionality of this file is to define routes related to hosting like adding a home etc



// Core Module
//we need path module to work with file and directory paths and to serve html files if we don't use path module it may lead to errors in different operating systems because of different path formats
const path = require('path');

// External Module
const express = require('express');

//express.Router() is used to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this file we will use it to define all the routes related to hosting
const hostRouter = express.Router();

// Local Module
//we need rootDir to construct absolute paths for serving html files it is importing the pathUtil.js file from utils folder
const rootDir = require("../utils/pathUtil");

//defining the route for /host/add-home to serve the addHome.html file when a GET request is made to this route
hostRouter.get("/add-home", (req, res, next) => {
  //we are sending the addHome.html file as response when user visits /host/add-home route
  //this is a GET request handler for /host/add-home route
  res.sendFile(path.join(rootDir, 'views', 'addHome.html'));
})

hostRouter.post("/add-home", (req, res, next) => {
  //this is a POST request handler for /host/add-home route
  //here we will handle the form submission for adding a new home
  console.log(req.body);
  //after processing the form data we can redirect the user to a different page or send a response
  //for simplicity we will just send back the same addHome.html file
  res.sendFile(path.join(rootDir, 'views', 'homeAdded.html'));
})

module.exports = hostRouter;
