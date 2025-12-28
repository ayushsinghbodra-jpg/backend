//this will create a simple HTTP server that logs incoming requests
const http = require('http');
//this imports the built-in HTTP module
const server = http.createServer((req, res) => {
    //this callback function runs whenever a request is received
  console.log(req);
});

const PORT = 3001;
//defining a port number for the server to listen on
server.listen(PORT, () => {
    //this callback runs when the server starts listening
  console.log(`Server running on address http://localhost:${PORT}`);
});