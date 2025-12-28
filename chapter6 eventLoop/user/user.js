const fs = require('fs');

const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

  if (req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><meta charset="utf-8"><title>Complete Coding</title><style>\n  :root{--bg:#0f172a;--card:#0b1220;--accent:#06b6d4;--muted:#94a3b8}\n  *{box-sizing:border-box}body{margin:0;font-family:system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial;background:linear-gradient(135deg,#0f172a,#071029);color:#e6eef8;display:flex;align-items:center;justify-content:center;min-height:100vh}\.card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:24px;border-radius:12px;width:360px;box-shadow:0 10px 30px rgba(2,6,23,0.6);border:1px solid rgba(255,255,255,0.03)}h1{margin:0 0 12px;font-size:1.25rem;color:#fff;text-align:center}form{display:flex;flex-direction:column;gap:10px}input[type="text"]{padding:10px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);color:#fff;outline:none}input[type="text"]::placeholder{color:rgba(255,255,255,0.45)}.radios{display:flex;gap:12px;align-items:center;justify-content:center}label.radio{display:flex;gap:6px;align-items:center;color:var(--muted);font-size:0.95rem}input[type="submit"]{padding:10px 12px;border-radius:8px;border:none;background:var(--accent);color:#042028;font-weight:700;cursor:pointer;transition:transform .12s ease,box-shadow .12s ease}input[type="submit"]:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(6,182,212,0.12)}.small{font-size:0.85rem;color:var(--muted);text-align:center;margin-top:8px}\n</style></head>');
    res.write('<body>');
    res.write('<div class="card">');
    res.write('<h1>Enter Your Details</h1>');
    res.write('<form action="/submit-details" method="POST">');
    res.write('<input type="text" name="username" placeholder="Enter your name">');
    res.write('<div class="radios">');
    res.write('<label class="radio"><input type="radio" id="male" name="gender" value="male" /> Male</label>');
    res.write('<label class="radio"><input type="radio" id="female" name="gender" value="female" /> Female</label>');
    res.write('</div>');
    res.write('<input type="submit" value="Submit">');
    res.write('</form>');
    res.write('<div class="small">Thanks for trying this demo</div>');
    res.write('</div>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
    
  } else if (req.url.toLowerCase() === "/submit-details" &&
        req.method == "POST") {
    
    const body = [];      
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);
      const params = new URLSearchParams(fullBody);
      const bodyObject = Object.fromEntries(params);
      console.log(bodyObject);
      //because fs.writeFileSync is blocking the event loop, we will use fs.writeFile which is non-blocking benefit is that other requests can be handled while the file is being written
      fs.writeFile('user.txt', JSON.stringify(bodyObject), error => {
        console.log('Data written successfully');
        //here we are sending the response after the file is written and then we are redirecting the user back to the home page maintaining the status code 302
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  } else {
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><meta charset="utf-8"><title>Complete Coding</title><style>\n  :root{--bg:#0f172a;--card:#0b1220;--accent:#06b6d4;--muted:#94a3b8}\n  *{box-sizing:border-box}body{margin:0;font-family:system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial;background:linear-gradient(135deg,#0f172a,#071029);color:#e6eef8;display:flex;align-items:center;justify-content:center;min-height:100vh}.card{background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));padding:24px;border-radius:12px;width:360px;box-shadow:0 10px 30px rgba(2,6,23,0.6);border:1px solid rgba(255,255,255,0.03)}h1{margin:0;font-size:1.25rem;color:#fff;text-align:center}.small{font-size:0.95rem;color:var(--muted);text-align:center;margin-top:8px}a.link{color:var(--accent);text-decoration:none;font-weight:700}\n</style></head>');
    res.write('<body>');
    res.write('<div class="card">');
    res.write('<h1>Like / Share / Subscribe</h1>');
    res.write('<p class="small">Enjoyed this example? <a class="link" href="/">Go Home</a></p>');
    res.write('</div>');
    res.write('</body>');
    res.write('</html>');
    res.end();
  }
};

module.exports = userRequestHandler;