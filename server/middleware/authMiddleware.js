// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded); // Log the decoded token
    req.user = decoded.user;
    next(); // Pass control to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
