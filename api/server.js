const http = require('http');
const data = require('./db.json');

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const { url } = req;
  
  if (url === '/statement' || url === '/statement/') {
    res.writeHead(200);
    res.end(JSON.stringify(data.statement));
  } else if (url === '/user' || url === '/user/') {
    res.writeHead(200);
    res.end(JSON.stringify(data.user));
  } else if (url === '/amount' || url === '/amount/') {
    res.writeHead(200);
    res.end(JSON.stringify(data.amount));
  } else {
    res.writeHead(200);
    res.end(JSON.stringify(data));
  }
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`API running on port ${port}`);
});