// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const hostController = require("../controllers/hostController");

//this file only functionality is to handle the GET and POST requests from the host :)

//from this all the request will be forwarded to the controller functions to handle the request and send the response back to the host

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);

module.exports = hostRouter;

