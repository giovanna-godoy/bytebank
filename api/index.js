import { data } from './db.json';

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const path = req.url.replace('/api', '');
  
  if (path === '/statement') return res.json(data.statement);
  if (path === '/user') return res.json(data.user);
  if (path === '/amount') return res.json(data.amount);
  if (path === '/investments') return res.json(data.investments);
  
  res.status(404).json({ error: 'Not found' });
};