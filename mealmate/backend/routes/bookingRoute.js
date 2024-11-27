const express = require('express');
const Booking = require('../models/Booking');
const authenticate = require('../middleware/authenticate');
const Review = require('../models/Review');

const router = express.Router();

router.get('/bookings', authenticate, async (req, res) => {
    try {
      console.log('Authenticated user:', req.user);
      const { userId, role } = req.user;
  
      let bookings = [];
  
      if (role === 'chef') {
        // Fetch bookings where user is the chef or the requester
        bookings = await Booking.find({
          $or: [{ chef_id: userId }, { user_id: userId }],
        })
          .populate('request_id')
          .populate('user_id', 'name phone')
          .populate('chef_id', 'name phone');
      } else if (role === 'user') {
        // Fetch bookings where user is the requester
        bookings = await Booking.find({ user_id: userId })
          .populate('request_id')
          .populate('chef_id', 'name phone')
          .populate('user_id', 'name phone');
      }
  
      console.log('Fetched bookings:', bookings);
      res.json({ success: true, bookings });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

  // Submit a review
router.post('/reviews/submit', authenticate, async (req, res) => {
  try {
      const { user_id, chef_id, rating } = req.body;

      if (!user_id || !chef_id || !rating) {
          return res.status(400).json({ success: false, message: 'Missing fields.' });
      }

      const newReview = new Review({ user_id, chef_id, rating });
      await newReview.save();

      res.json({ success: true, message: 'Review submitted successfully.', review: newReview });
  } catch (error) {
      console.error('Error submitting review:', error);
      res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Route to submit a rating
router.post('/submit-rating', authenticate, async (req, res) => {
  const { user_id, chef_id, rating } = req.body;

  // Validation checks
  if (!user_id || !chef_id || !rating) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
  }

  try {
    // Check if a rating already exists for this booking
    const existingReview = await Review.findOne({ user_id, chef_id });
    if (existingReview) {
      return res.status(400).json({ message: 'Rating already submitted for this booking.' });
    }

    // Check if this booking exists and is completed
    const booking = await Booking.findOne({ user_id, chef_id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found or invalid.' });
    }

    // Create and save the new review
    const review = new Review({
      user_id,
      chef_id,
      rating,
    });

    await review.save();

    res.status(201).json({ message: 'Rating submitted successfully', review });
  } catch (error) {
    console.error('Error submitting rating:', error);
    res.status(500).json({ message: 'Error submitting rating', error: error.message });
  }
});
  
// router.get('/bookings', authenticate, async (req, res) => {
//     try {
//       console.log('Authenticated user:', req.user);
//       const { userId, role } = req.user; // Extract directly
  
//       let bookings = [];
//       if (role === 'chef') {
//         const query = { chef_id: userId };
//         console.log('Query:', query);
  
//         bookings = await Booking.find(query)
//           .populate('request_id')
//           .populate('user_id', 'name phone');
//       } else if (role === 'user') {
//         bookings = await Booking.find({ user_id: userId })
//           .populate('request_id')
//           .populate('chef_id', 'name phone');
//       }
  
//       console.log('Fetched bookings:', bookings); // Debugging
//       res.json({ success: true, bookings });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Server error' });
//     }
//   });

  
// router.get('/bookings', authenticate, async (req, res) => {
//   try {
//     console.log('Authenticated user:', req.user);
//     const userId = req.user._id;
//     const role = req.user.role;

//     let bookings;
//     if (role === 'chef') {
//         console.log('Request user:', req.user);
//         const { userId } = req.user;
//         const query = { chef_id: userId };
//         console.log('Query:', query);
      
//         bookings = await Booking.find(query)
//           .populate('request_id')
//           .populate('user_id', 'name phone');
//         console.log('Fetched bookings:', bookings);
//       }
//     if (role === 'user') {
//       bookings = await Booking.find({ user_id: userId })
//         .populate('request_id')
//         .populate('chef_id', 'name phone');
//     } else if (role === 'chef') {
//       bookings = await Booking.find({ chef_id: userId })
//         .populate('request_id')
//         .populate('user_id', 'name phone');
//     }

//     console.log('Fetched bookings:', bookings); // Debugging
//     res.json({ success: true, bookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

module.exports = router;
