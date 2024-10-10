const express = require('express');

const router = express.Router();

const Request = require('../models/Request'); 

// to fetch user_id of the logged in user
const User = require('../models/User');

router.post('/requests', async (req, res) => {
  try {
    const { user_email, food_preference, date, location } = req.body;

    const user = await User.findOne({email: user_email});

    console.log(user._id);

    if(!user){
        return res.status(404).json({ message: 'User not found'});
    }

    // Create a new request
    const newRequest = new Request({
      user_id: user._id, // using user_id
      food_preference,
      date,
      location,
      status: 'pending',
    });

    // Save request to the database
    await newRequest.save();

    res.status(200).json({ message: 'Request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
