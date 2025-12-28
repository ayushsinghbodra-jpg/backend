const http = require('http');

//this will import the request handler function from user.js file
const requestHandler = require('./user');

//this will basically call userRequestHandler function whenever there is a request to the server
const server = http.createServer(requestHandler);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});