const data = require('./db.json');

module.exports = (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { url } = req;
  
  if (url === '/statement' || url === '/statement/') {
    res.json(data.statement);
  } else if (url === '/user' || url === '/user/') {
    res.json(data.user);
  } else if (url === '/amount' || url === '/amount/') {
    res.json(data.amount);
  } else {
    res.json(data);
  }
};