// External Module
const express = require("express");
const authRouter = express.Router();

// Local Module
const authController = require("../controllers/authController");
//the first thing that the user willl see is login page so we are defining login route first
//then he can signup or login
//if he is logged in then only he can logouts
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);
authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);

module.exports = authRouter;
