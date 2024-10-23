const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/User');

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../uploads/');  // Folder to store certificates
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// @route POST /api/chefs/signup
router.post('/signup', upload.array('food_handling_certificates'), async (req, res) => {
    const { name, email, password, phone, lat, lng, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new chef
        const foodHandlingCertificates = req.files.map(file => file.path);

        user = new User({
            name,
            email,
            password_hash: await bcrypt.hash(password, 10),  // Hash the password
            phone,
            location: { lat, lng },
            role,
            food_handling_certificates: foodHandlingCertificates,
        });

        await user.save();
        res.status(201).json({ message: 'Chef created successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
