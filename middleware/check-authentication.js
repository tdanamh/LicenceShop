const jwt = require('jsonwebtoken');
const jwtKey = require('../config/keys').JWT_KEY;

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Autentificare nereusita!' });
  }
  try {
    decoded = jwt.verify(req.headers.authorization.split(" ")[1], jwtKey);
    if (decoded.isAdmin) {
      return res.status(401).json({ message: 'Autentificare nereusita!' });
    }
  } catch(err) {
    return res.status(401).json({ message: 'Autentificare nereusita!' });
  }
  next();
};