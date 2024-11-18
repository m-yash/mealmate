const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('Invalid token', err);
      return res.status(400).json({ success: false, message: 'Invalid token.' });
    }
    req.user = decoded; // Add the decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticate;
