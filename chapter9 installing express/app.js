// External Module
const express = require('express');
//the app variable now holds the express application
const app = express();
//app.get will handle only GET requests to the specified route

app.get("/", (req, res, next) => {
  console.log("Came in first middleware", req.url, req.method);
  //res.send("<p>Came from First Middleware</p>");
  next();
});

//app.post will handle only POST requests to the specified route
app.post("/submit-details", (req, res, next) => {
  console.log("Came in second middleware", req.url, req.method);
  //res.send is used to send the response to the client
  //and you can the response only once
  res.send("<p>Welcome to Complete Coding Nodejs series</p>");
});

//app.use will handle all types of requests to the specified route
app.use("/", (req, res, next) => {
  console.log("Came in another middleware", req.url, req.method);
  res.send("<p>Came from another Middleware</p>");
});


const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});