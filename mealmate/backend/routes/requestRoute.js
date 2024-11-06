const express = require('express');

const router = express.Router();

const Request = require('../models/Request');

// to fetch user_id of the logged in user
const User = require('../models/User');

// to save a new user request
router.post('/new-request', async (req, res) => {
  try {
    const { user_email, food_preference, date, location } = req.body;

    const user = await User.findOne({ email: user_email });

    console.log(user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new request
    const newRequest = new Request({
      user_id: user._id, // using user_id
      food_preference,
      date,
      location: user.location, // Use user’s saved location
      status: 'pending',
    });

    // Save request to the database
    await newRequest.save();

    res.status(200).json({ message: 'Request submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// // to fetch the saved requests
// router.get('/all-request', async (req, res) => {

//   // previous implementation to show all requests into the Available request in dashboard
//   // try {
//   //   const requests = await Request.find().populate('user_id', 'name');
//   //   res.json(requests);
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).json({ message: 'Failed to retrieve requests' });
//   // }

//   // Location based data fetching
//   try {
//     // Assuming latitude and longitude are sent as query params
//     const { lat, lng } = req.query;

//     if (!lat || !lng) {
//       return res.status(400).json({ message: 'User location is required' });
//     }

//     // Find requests within 3km (3000 meters) of the provided location
//     const nearbyRequests = await Request.find({
//       location: {
//         $near: {
//           $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
//           $maxDistance: 3000  // 3 km in meters
//         }
//       }
//     }).populate('user_id', 'name');  // Populate to get user name

//     res.json(nearbyRequests);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to retrieve nearby requests' });
//   }

// });

// // Route to get user location by email
// router.get('/location', async (req, res) => {
//   const { email } = req.query;
//   console.log('Received request for email:', email);
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.json({ location: user.location });
//   } catch (error) {
//     console.error("Error fetching user location:", error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



// Helper function to calculate distance between two coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// calculation based
// Route to get nearby requests within 3km based on user email
// router.get('/all-request', async (req, res) => {
//   const { email } = req.query;

//   try {
//     // Fetch the user's location using email
//     const user = await User.findOne({ email });
//     if (!user || !user.location) {
//       return res.status(404).json({ message: 'User not found or location not available' });
//     }

//     const { lat: userLat, lng: userLng } = user.location;

//     // Fetch all requests
//     const allRequests = await Request.find({});

//     // Filter requests within 3 km
//     const nearbyRequests = allRequests.filter((request) => {
//       const { lat: requestLat, lng: requestLng } = request.location;
//       return calculateDistance(userLat, userLng, requestLat, requestLng) <= 3;
//     });

//     res.json(nearbyRequests);
//   } catch (error) {
//     console.error("Error fetching requests:", error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// geoJSON
// Route to get nearby requests within 3km based on user email
// router.get('/all-request', async (req, res) => {
//   const { email } = req.query;

//   try {
//     // Fetch the user's location using email
//     const user = await User.findOne({ email });
    
//     // Check if user and user location are available
//     if (!user || !user.location || !user.location.coordinates) {
//       return res.status(404).json({ message: 'User location not found' });
//     }

//     const [userLng, userLat] = user.location.coordinates;

//     // Define the 3 km radius in radians (3 km / Earth radius in km)
//     const radiusInRadians = 3 / 6378.1;

//     // Fetch requests within 3 km using MongoDB's geospatial query
//     const nearbyRequests = await Request.find({
//       location: {
//         $geoWithin: {
//           $centerSphere: [[userLng, userLat], radiusInRadians],
//         },
//       },
//     });

//     res.json(nearbyRequests);
//   } catch (error) {
//     console.error("Error fetching requests:", error);
//     res.status(500).json({ message: 'Server Error', error: error.message });
//   }
// });
router.get('/all-request', async (req, res) => {
  const { email } = req.query;

  try {
    // Fetch the user's location using email
    const user = await User.findOne({ email });
    
    // Check if user and user location are available
    if (!user || !user.location || !user.location.coordinates) {
      return res.status(404).json({ message: 'User location not found' });
    }

    const [userLng, userLat] = user.location.coordinates;

    // Define the 3 km radius in radians (3 km / Earth radius in km)
    const radiusInRadians = 3 / 6378.1;

    // Fetch requests within 3 km using MongoDB's geospatial query and populate user_id
    const nearbyRequests = await Request.find({
      location: {
        $geoWithin: {
          $centerSphere: [[userLng, userLat], radiusInRadians],
        },
      },
    }).populate('user_id', 'name'); // Populate only the 'name' field of user_id

    res.json(nearbyRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


module.exports = router;
