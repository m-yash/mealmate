const express = require('express');
const router = express.Router();
const UserResponse = require('../models/UserResponses');
const Request = require('../models/Request');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Review = require('../models/Review');


// Appeal a request
router.post('/appeal', async (req, res) => {
  const { request_id, chef_id, comments} = req.body;
  try {
    // Find the user to check their role
    const user = await User.findById(chef_id);
    if (!user) {
      return res.status(404).send({ message: 'User  not found.' });
    }

    // Check if the user has the 'chef' role
    if (user.role !== 'chef') {
      return res.status(403).send({ message: 'You must upload your food handling certificate to make an appeal.' });
    }
    // Find the request to check the user who made it
    const request = await Request.findById(request_id); 

    // Check if the request exists
    if (!request) {
      return res.status(404).send({ message: 'Request not found.' });
    }

    // Check if the chef is appealing their own request
    if (request.user_id.toString() === chef_id) {
      return res.status(400).send({ message: 'You cannot appeal your own request.' });
    }
    // Check if an appeal already exists for this request and chef
    const existingResponse = await UserResponse.findOne({ request_id, chef_id });

    if (existingResponse) {
      // If a response already exists, return a message indicating that
      return res.status(400).send({ message: 'The request has already been appealed. Please wait for the response.' });
    }

    // If no response exists, create a new one
    const response = new UserResponse({
      request_id,
      chef_id,
      response_status: 'pending',
      comments,  // Save the comments
    });
    await response.save();

    res.status(200).send("Request appealed successfully");
  } catch (error) {
    console.error("Error recording appeal:", error);
    res.status(500).send("Error recording appeal: " + error.message);
  }
});

// Reject a request
router.post('/reject', async (req, res) => {
  const { request_id, chef_id } = req.body;
  try {
    const response = new UserResponse({
      request_id,
      chef_id,
      response_status: 'rejected',
    });
    await response.save();
    res.status(201).send("Rejection recorded");
  } catch (error) {
    res.status(500).send("Error recording rejection: " + error.message);
  }
});

// Fetch appeals for a requester's requests
router.get('/fetch-appeals/:requesterId', async (req, res) => {
  const requesterId = req.params.requesterId;

  try {
    // Step 1: Fetch all request IDs for the requester
    const userRequests = await Request.find({ user_id: requesterId }).select('_id');
    const requestIds = userRequests.map(request => request._id);

    // Step 2: Filter out requests with accepted bookings
    const bookedRequestIds = await Booking.find({ user_id: requesterId })
      .select('request_id')
      .then(bookings => bookings.map(booking => booking.request_id?.toString()).filter(id => id));

    const filteredRequestIds = requestIds.filter(id => !bookedRequestIds.includes(id.toString()));

    // Step 3: Fetch appeals for those filtered request IDs
    const appeals = await UserResponse.find({ request_id: { $in: filteredRequestIds } })
      .populate('chef_id', 'name') // Populate chef name
      .populate('request_id', 'food_preference date');

    // Step 4: Calculate average ratings for all chefs
    const chefRatings = await Review.aggregate([
      { $group: { _id: '$chef_id', averageRating: { $avg: '$rating' } } }, // Group by chef_id
    ]);

    // Step 5: Create a dictionary for quick lookup
    const chefRatingsMap = chefRatings.reduce((acc, rating) => {
      acc[rating._id.toString()] = rating.averageRating;
      return acc;
    }, {});

    // Step 6: Add average rating to each appeal
    const appealsWithRatings = appeals.map(appeal => ({
      ...appeal.toObject(),
      chefRating: chefRatingsMap[appeal.chef_id._id.toString()] || 'No Ratings', // Default to 'No Ratings'
    }));

    // Step 7: Send the response
    res.status(200).json(appealsWithRatings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching appeals: " + error.message });
  }
});

// router.get('/fetch-appeals/:requesterId', async (req, res) => {
//   const requesterId = req.params.requesterId;

//   try {
//     // Fetch all requests made by the requester
//     const userRequests = await Request.find({ user_id: requesterId }).select('_id');

//     // Extract request IDs
//     const requestIds = userRequests.map(request => request._id);

//     // Get IDs of requests with existing bookings
//     const bookedRequestIds = await Booking.find({ user_id: requesterId })
//       .select('request_id')
//       .then(bookings => bookings
//         .map(booking => booking.request_id ? booking.request_id.toString() : null)
//         .filter(id => id !== null) // Filter out any null values
//       );

//     // Filter appeals to exclude requests that have an accepted booking
//     const appeals = await UserResponse.find({
//       request_id: { $in: requestIds.filter(id => !bookedRequestIds.includes(id.toString())) }
//     })
//       .populate('chef_id', 'name') // Populate chef name
//       .populate('request_id', 'food_preference date');

//     // If there are no appeals left for a request, you can return an empty array
//     const filteredAppeals = appeals.filter(appeal => appeal.response_status !== 'accepted');

//     res.status(200).json(filteredAppeals);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching appeals: " + error.message });
//   }
// });

// responseRoute.js
router.post('/accept', async (req, res) => {
  const { response_id } = req.body;

  try {
    // Find the response being accepted
    const acceptedResponse = await UserResponse.findById(response_id).populate('request_id chef_id');

    if (!acceptedResponse) {
      return res.status(404).send("Response not found.");
    }

    const requestId = acceptedResponse.request_id._id;

    // Check if a booking already exists for this request
    const existingBooking = await Booking.findOne({ user_id: acceptedResponse.request_id.user_id, request_id: requestId });

    if (existingBooking) {
      return res.status(400).send("An appeal has already been accepted for this request.");
    }

    // Set this response as accepted
    acceptedResponse.response_status = 'accepted';
    await acceptedResponse.save();

    // Mark other responses for this request as rejected
    await UserResponse.updateMany(
      { request_id: requestId, _id: { $ne: response_id } },
      { $set: { response_status: 'rejected' } }
    );

    // Create a booking
    const newBooking = new Booking({
      user_id: acceptedResponse.request_id.user_id,
      chef_id: acceptedResponse.chef_id._id,
      request_id: requestId, // Add request_id
      date: acceptedResponse.request_id.date,
      status: 'accepted'
    });
    await newBooking.save();

    // Update the request status to 'fulfilled'
    await Request.findByIdAndUpdate(requestId, { status: 'fulfilled' });

    res.status(200).send("Appeal accepted");
  } catch (error) {
    res.status(500).send("Error processing acceptance: " + error.message);
  }
});

// Accept an appeal and create a booking
// router.post('/accept', async (req, res) => {
//   const { response_id } = req.body;

//   try {
//     // Find the response being accepted
//     const acceptedResponse = await UserResponse.findById(response_id).populate('request_id chef_id');

//     if (!acceptedResponse) {
//       return res.status(404).send("Response not found.");
//     }

//     const requestId = acceptedResponse.request_id._id;

//     // Check if a booking already exists for this request
//     const existingBooking = await Booking.findOne({ user_id: acceptedResponse.request_id.user_id, request_id: requestId });

//     if (existingBooking) {
//       return res.status(400).send("An appeal has already been accepted for this request.");
//     }

//     // Set this response as accepted
//     acceptedResponse.response_status = 'accepted';
//     await acceptedResponse.save();

//     // Mark other responses for this request as rejected
//     await UserResponse.updateMany(
//       { request_id: requestId, _id: { $ne: response_id } },
//       { $set: { response_status: 'rejected' } }
//     );

//     // Create a booking
//     const newBooking = new Booking({
//       user_id: acceptedResponse.request_id.user_id,
//       chef_id: acceptedResponse.chef_id._id,
//       date: acceptedResponse.request_id.date,
//       status: 'accepted'
//     });
//     await newBooking.save();

//     res.status(200).send("Appeal accepted and booking created.");
//   } catch (error) {
//     res.status(500).send("Error processing acceptance: " + error.message);
//   }
// });

router.get('/my-appeals', async (req, res) => {
  const { chef_id } = req.query;
  try {
    const appeals = await UserResponse.find({ chef_id, response_status: 'pending' }).populate('request_id', 'food_preference date');
    res.json(appeals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching your appeals' });
  }
});

router.post('/revoke', async (req, res) => {
  const { appealId } = req.body;
  try {
    await UserResponse.findByIdAndDelete(appealId);
    res.status(200).json({ message: 'Appeal revoked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error revoking appeal' });
  }
});



module.exports = router;
