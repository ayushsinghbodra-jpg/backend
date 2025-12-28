// External Module
const express = require('express');
//we need bodyParser to parse the incoming form data because by default express does not parse the incoming request body
const bodyParser = require('body-parser');
//we don't need to create the server using http module because express does that internally
//we don't need a separate const app like to have the function for body parsing because we can use app.use to use the body parser middleware


const app = express();

app.use((req, res, next) => {
  console.log("First Dummy Middleware", req.url, req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Second Dummy Middleware", req.url, req.method);
  next();
});

// app.use((req, res, next) => {
//   console.log("Third Middleware", req.url, req.method);
//   res.send("<h1>Welcome to Complete Coding</h1>");
// });

app.get("/", (req, res, next) => {
  console.log("Handling / for GET", req.url, req.method);
  res.send(`<h1>Welcome to Complete Coding</h1>`);
})

app.get("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for GET", req.url, req.method);
  res.send(
    `<h1>Please give your details here</h1>
    <form action="/contact-us" method="POST">
      <input type="text" name="name" placeholder="Enter your name" />
      <input type="email" name="email" placeholder="Enter your Email" />
      <input type="Submit" />
    </form>
    `);
});

app.post("/contact-us", (req, res, next) => {
  console.log("First handling", req.url, req.method, req.body);
  //here next is used to pass the control to the next matching route handler
  next();
})

//this middleware will parse the incoming request body and make it available in req.body
//bodyParser.urlencoded() returns a middleware function that parses urlencoded bodies if you use extended: true it will allow to parse nested objects otherwise it will parse only simple key value pairs
//by default extended is false
//if not used req.body will be undefined
app.use(bodyParser.urlencoded());

app.post("/contact-us", (req, res, next) => {
  console.log("Handling /contact-us for POST", req.url, req.method, req.body);
  res.send(`<h1>We will contact you shortly</h1>`);
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});