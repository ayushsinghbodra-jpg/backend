// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
//here we adding errorsControllers to handle 404 errors and import it from controllers folder :)
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

//app.use(storeRouter) will route all the requests starting from '/' to storeRouter previously mentioned as userRouter inprevious project.


//eventhough both storeRouter and hostRouter are imported from routes that are again inside routes folder but still express is able to differentiate between the two routers because of the way we are using them in app.js file .
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

//errorsController.pageNotFound  is the syntax to call the pageNotFound method from errorsController to handle 404 errors
//this pagenotFound will be sent to head.ejs as parameter to set the title of the page dynamically
app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});