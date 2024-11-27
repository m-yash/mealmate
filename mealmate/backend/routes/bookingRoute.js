const express = require('express');
const Booking = require('../models/Booking');
const authenticate = require('../middleware/authenticate');

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
