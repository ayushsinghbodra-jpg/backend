const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req);
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});


//npm init -y will create a package.json file with default values
//npm install nodemon --save-dev will install nodemon as a dev dependency and add it to package.json
//npx nodemon app.js will run the app.js file with nodemon which will restart the server on file changes
//we can also add a start script in package.json to run nodemon easily using npm start commands