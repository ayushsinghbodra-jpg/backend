console.log("KG  Coding is the best.");
//this will create a file named output.txt and write "Writing File" into it
const fs = require('fs');
// Node loads the built-in File System module
// fs now holds functions like writeFile, readFile, etc.
fs.writeFile("output.txt", "Writing File", (err) => {
    //this is a callback function that will be called when the file writing is done
  if (err) console.log("Error occurred");
  else console.log('File Written Successfully');
});