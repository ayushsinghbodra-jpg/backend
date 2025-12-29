// Core Modules
const path = require('path');

// External Module
const express = require('express');
const userRouter = express.Router();

// Local Module
const rootDir = require("../utils/pathUtil");

userRouter.get("/", (req, res, next) => {
  //this is the GET request handler for the home route
  res.sendFile(path.join(rootDir, 'views', 'home.html'));
});

module.exports = userRouter;

//there are four kinds of methods GET, POST, PUT, DELETE
//GET is used to request data from a specified resource
//POST is used to send data to a server to create/update a resource
//PUT is used to send data to a server to create/update a resource
//DELETE is used to delete the specified resource

//the basic functionality of this file is to handle user requests like serving the home page and handling form submissionsAnd saving user details to a file