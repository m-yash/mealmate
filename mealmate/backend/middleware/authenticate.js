// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//   const authHeader = req.header('Authorization');
//   const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       console.error('Invalid token', err);
//       return res.status(400).json({ success: false, message: 'Invalid token.' });
//     }
//     console.log('Decoded token:', decoded);

//     req.user = decoded; // Add the decoded user data to the request object
//     next(); // Proceed to the next middleware or route handler
//   });
// };

// module.exports = authenticate;
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as per your project structure

const authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    console.log('Decoded token:', decoded);

    // Fetch the user role from the database
    const user = await User.findById(decoded.userId).select('role');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    req.user = { ...decoded, role: user.role }; // Add user data and role to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Authentication error:', err);
    res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};

module.exports = authenticate;