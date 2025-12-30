// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
//const db = require("./utils/databaseUtil");

const app = express();
// this is just to check the database connection and fetching the data from the database
//it should return the data present in the homes table
// db.execute('SELECT * FROM homes').then(result=>{
//   console.log("Getting the data from the database", result);
// })
// .catch(err=>{
//   console.log("Error while fetching data from database", err);  
// });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});