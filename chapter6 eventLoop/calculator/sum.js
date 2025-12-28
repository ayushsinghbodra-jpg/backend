//event loop means that certain operations are asynchronous in nature
//so the execution order will be different than the written order

const sumRequestHandler = (req, res) => {
  //This is synchronous code inside the request handler function, so it runs immediately when the function is called
  console.log("1. In Sum Request Handler", req.url);
  const body = [];
  //we are keeping the result as let because its value will be assigned in 'end' event if it would have neen const then it would have given error because const variable cannot be re assigned :)
  let result;
  req.on('end', () => {
    //The 'end' event is emitted only after all 'data' events have finished, meaning the entire request body has been received.
    console.log("3. End event came");
    const bodyStr = Buffer.concat(body).toString();
    const params = new URLSearchParams(bodyStr);
    const bodyObj = Object.fromEntries(params);
    result = Number(bodyObj.first) + Number(bodyObj.second);
    console.log(result);
  });
  //The 'data' event is triggered asynchronously when chunks of the request body arrive from the network.Once data arrives, the callback is placed in the event queue and executed by the event loop.
  req.on('data', chunk => {
    body.push(chunk);
    console.log("2. Chunk Came");
  });
  //This is also synchronous code.JavaScript does not wait for asynchronous event listeners (data, end) to fire before continuing execution. and so it will be exectuted directly after registering the event listeners
  console.log("4. Sending the response");
  res.setHeader('Content-Type', 'text/html');
  res.write(`
    <html>
      <head><title>Practise Set</title></head>
      <body>
        <h1>Your Sum is ${result}</h1>
      </body>  
    <html>  
  `); 
  return res.end();
}

exports.sumRequestHandler = sumRequestHandler;

//so in the end the response will be sent before the 'end' event is fired and so the result will be undefined