// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter");
//we need this to serve static files
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

//serving static files like css, images, js etc.
//express.static is a built-in middleware function in Express.js whose main purpose is to serve static files such as images, CSS files, and JavaScript files.
//serve staic files means making these files accessible to the client (browser) so that they can be loaded and rendered properly when a user visits your web application.
app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});