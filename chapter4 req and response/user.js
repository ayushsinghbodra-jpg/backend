const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Complete Coding</title></head>');
    res.write('<body><h1>Enter Your Details:</h1>');
    //action attribute specifies where to send the form-data when a form is submitted.
    //method attribute specifies the HTTP method to use when sending form-data.
    res.write('<form action="/submit-details" method="POST">');
    //input field for username and in it the type means the kind of input field palceholder is the text displayed in the input field when it is empty  
    res.write('<input type="text" name="username" placeholder="Enter your name"><br>');
    // label will define the text for the radio button and for attribute links it to the input field with the corresponding id
    //here for="male" means it is linked to the input field with id="male" 
    res.write('<label for="male">Male</label>')
    res.write('<input type="radio" id="male" name="gender" value="male" />')
    res.write('<label for="female">Female</label>')
    res.write('<input type="radio" id="female" name="gender" value="female" />')
    //this is a submit button to submit the form and the value attribute defines the text displayed on the button
    //when this button is clicked the form data is sent to the server as per the action and method attributes defined in the form tag
    res.write('<br><input type="submit" value="Submit">');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    //when you will click submit then you will be redirected to /submit-details route with POST method because there is no other post route defined
  } else if (req.url.toLowerCase() === "/submit-details" &&
        req.method == "POST") {
    fs.writeFileSync('user.txt', 'Ayush Kumar Singh');
    //302 status code is for redirection and we can see it in the browser network tab
    res.statusCode = 302;
    // here setHeader is required to set the location to which we want to redirect
    res.setHeader('Location', '/');
  }
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