const express = require('express');
const Booking = require('../models/Booking');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.get('/bookings', authenticate, async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    let bookings;
    if (role === 'user') {
      bookings = await Booking.find({ user_id: userId })
        .populate('request_id')
        .populate('chef_id', 'name phone');
    } else if (role === 'chef') {
      bookings = await Booking.find({ chef_id: userId })
        .populate('request_id')
        .populate('user_id', 'name phone');
    }

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
