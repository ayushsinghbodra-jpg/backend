// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");


const app = express();

//app.set() method is used to set the view engine and views directory for ejs templating engine
//'view engine' is a predefined key in express to set the templating engines then the second parameter is the name of the templating engine we are using here ejs
app.set('view engine', 'ejs');

//'views' is a predefined key in express to set the directory where the view templates are stored here we are setting it to 'views' folder
app.set('views', 'views');

//we need to use extended: true to parse nested objects from the form data if false it will only parse simple key-value pairs and by default it is false if true it will use the qs library to parse the data otherwise it will use the querystring library
//qs library allows to parse nested objects from the form data
//querystring library does not support nested objects
//quetysting library is used to parse simple key-value pairs from the form data whereas qs library is used to parse nested objects from the form data
app.use(express.urlencoded({ extended: true}));
app.use(userRouter);
app.use("/host", hostRouter);



app.use(express.static(path.join(rootDir, 'public')));

app.use((req, res, next) => {
  res.status(404).render('404', {pageTitle: 'Page Not Found'});
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});