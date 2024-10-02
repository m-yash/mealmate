const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route POST /api/users/signup

router.post('/signup', async (req, res) => {
    const { name, email, password, lat, lng, role } = req.body;

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

module.exports = router;