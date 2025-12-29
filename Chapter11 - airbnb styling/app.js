// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
//from the routes folder we are importing userRouter and hostRouter to use them in our main app file so that we can keep our code modular and organized
const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");

const app = express();

//express.urlencoded() is a built-in middleware function in Express. It parses incoming requests with urlencoded payloads and is based on body-parser.
app.use(express.urlencoded());

//here we are using the routers defined in separate files for better code organization ie userRouter and hostRouter
//app.use(userRouter) means we are using all the routes defined in userRouter without any prefix this will directly use the routes as defined in userRouter

app.use(userRouter);
//we are prefixing all the routes defined in hostRouter with /host
app.use("/host", hostRouter);



//serving static files like css, images, js from public folder
//static is a built-in middleware function in Express. It serves static files and is based on serve-static.
//static files means files that are not changing like css, images, js etc
//we need to provide the absolute path of the folder containing static files and if we have multiple static folders we can use multiple app.use statements if we don't provide absolute path it will look for the folder in the current working directory which may lead to errors
app.use(express.static(path.join(rootDir, 'public')))

//handling 404 errors for undefined routesif we reach here that means no route matched so we can send 404 response
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});