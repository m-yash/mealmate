// routes/reviewRoute.js
const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Submit a rating
router.post('/submit', async (req, res) => {
    const { user_id, chef_id, rating } = req.body;

    try {
        const review = new Review({
            user_id,
            chef_id,
            rating,
        });
        await review.save();
        res.status(201).json({ message: 'Rating submitted successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting rating', error: error.message });
    }
});

module.exports = router;