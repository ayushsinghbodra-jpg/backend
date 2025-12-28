//There are 3 routes: /(home) , /products , any other route that displays different content based on the URL requested. 
//importing http module to create server
const http = require('http');
//creating server
const server = http.createServer((req, res) => {
  //logging request url, method and headers
  //url: which route is being requested
  //method: type of request(GET, POST, etc)
  //headers: additional info about the request
  console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
    //setHeader to inform browser about the type of content being sent
    res.setHeader('Content-Type', 'text/html');
    //res.write to send response body
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Welcome to Home</h1></body>');
    res.write('</html>');
    //res.end to signal that the response is complete and it is written with return to prevent further execution
    return res.end();
  } else if (req.url === '/products') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Checkout our products</h1></body>');
    res.write('</html>');
    return res.end();
  }
  //this block handles any other route not defined above
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1></body>');
  res.write('</html>');
  res.end();
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});