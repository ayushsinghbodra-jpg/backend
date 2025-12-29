// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

//this file only functionality is to handle the GET request from the user :)

//from this all the request will be forwarded to the controller functions to handle the request and send the response back to the user
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

module.exports = storeRouter;

