// routes/userRoute.js

// --- Login System ---

const express = require('express');

// routes
const router = express.Router();

// password encryption
const bcrypt = require('bcryptjs');

// auth
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const multer = require('multer'); // file upload

// Multer setup for file uploads with absolute path
const path = require('path');
const fs = require('fs');
// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads'));  // Ensure absolute path
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// implementation for remove chef model
// @route POST /user/create-account
router.post('/create-account', upload.single('food_handling_certificate'), async (req, res) => {
    const { name, email, password, phone, lat, lng } = req.body;
  
    try {
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Define the role based on certificate upload
      const role = req.file ? 'chef' : 'user';
      const foodHandlingCertificates = req.file ? [req.file.path] : [];
  
      // Create a new user
      user = new User({
        name,
        email,
        password_hash: await bcrypt.hash(password, 10),
        phone,
        location: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)],  // Ensure lat/lng are numbers
        },
        role,
        food_handling_certificates: foodHandlingCertificates,
      });
  
      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
});

// geoJSON working
// // Signup Route
// // @route POST /api/users/signup
// router.post('/create-account', async (req, res) => {
//     const { name, email, password, phone, lat, lng, role } = req.body;

//     try {
//         // Check if the user already exists
//         let user = await User.findOne({ email });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         // Create a new user
//         user = new User({
//             name,
//             email,
//             password_hash: await bcrypt.hash(password, 10),  // Hash the password
//             phone,
//             location: {
//                 type: 'Point',
//                 coordinates: [lng, lat] // GeoJSON format requires [longitude, latitude]
//             },
//             // location: { lat, lng },
//             role,
//         });

//         await user.save();
//         res.status(201).json({ message: 'User created successfully', user });
//     }
//     catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// Login route
// @route POST /api/users/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

        // Send back token, email, and user_id
        res.json({ token, email: user.email, user_id: user._id });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;