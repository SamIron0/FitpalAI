const geoip = require('geoip-lite');

export default function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip);
  console.log('geo',geo);
  console.log('ip',ip);
  
  if (geo) {
    res.status(200).json({ country: geo.country });
  } else {
    res.status(500).json({ error: 'Unable to detect country' });
  }
}