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

// Signup Route
// @route POST /api/users/signup
router.post('/create-account', async (req, res) => {
    const { name, email, password, phone, lat, lng, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        user = new User({
            name,
            email,
            password_hash: await bcrypt.hash(password, 10),  // Hash the password
            phone,
            location: { lat, lng },
            role,
        });

        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

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

        res.json({ token, email: user.email });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;