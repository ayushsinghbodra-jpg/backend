const fs = require('fs');
//userRequestHandler function to handle user requests
const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male" />');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" id="female" name="gender" value="female" />');
    res.write('<br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    //this else if block will handle the POST request to /submit-details route
  } else if (req.url.toLowerCase() === "/submit-details" &&
        req.method == "POST") {
    //an array to store the chunks of data received in the request body
    const body = [];
    //req.on is used to listen to events on the request object
    //listen means when the event occurs the callback function will be executed

    //in this case we are listening to 'data' event which is emitted when a chunk of data is available to read   
    req.on('data', chunk => {
      //this will log each chunk of data received
      console.log(chunk);
      //this will push each chunk of data into the body array
      body.push(chunk);
    });

    //'end' event is emitted when there is no more data to read
    req.on('end', () => {
      //fullBody will contain the complete request body as a string
      //Buffer.concat(body) will concatenate all the chunks in the body array into a single Buffer then we will convert it to stringso that we can read it
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      //URLSearchParams is a built-in class to work with the query string of a URL and query string is the part of the URL that contains data to be passed to web applications in the form of key-value pairs
      //query string means the part of a URL after the ? character because URL can be like http://example.com/page?name=John&age=30 here ?name=John&age=30 is the query string
      const params = new URLSearchParams(fullBody);
      // const bodyObject = {};
      // for (const [key, val] of params.entries()) {
      //   bodyObject[key] = val;
      // }

      //Object.fromEntries() method transforms a list of key-value pairs into an object and here params is an iterable of key-value pairs
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      //writing the bodyObject as a JSON string into user.txt file
      //JSON.stringify() method converts a JavaScript object into a JSON string
      fs.writeFileSync('user.txt', JSON.stringify(bodyObject));
    });
    //res.statusCode = 302 will redirect the user to another page
    res.statusCode = 302;
    res.setHeader('Location', '/');
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Like / Share / Subscribe</h1></body>');
  res.write('</html>');
  res.end();
};

// Exporting the userRequestHandler function this will help in importing this function in other files
module.exports = userRequestHandler;