const express = require('express');
const router = express.Router();
const UserResponse = require('../models/UserResponses');
const Request = require('../models/Request'); 
const Booking = require('../models/Booking');


// Appeal a request
router.post('/appeal', async (req, res) => {
  const { request_id, chef_id } = req.body;
  try {
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
      response_status: 'accepted',
    });
    await response.save();

    res.status(201).send("Request appealed successfully");
  } catch (error) {
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
    // Fetch all requests made by the requester
    const userRequests = await Request.find({ user_id: requesterId }).select('_id');

    // Extract request IDs
    const requestIds = userRequests.map(request => request._id);

    // Fetch all responses linked to these requests
    const appeals = await UserResponse.find({ request_id: { $in: requestIds } })
      .populate('chef_id', 'name') // Populate chef name
      .populate('request_id', 'food_preference date');

    res.status(200).json(appeals);
  } catch (error) {
    res.status(500).send("Error fetching appeals: " + error.message);
  }
});

// Accept an appeal and create a booking
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
      date: acceptedResponse.request_id.date,
      status: 'accepted'
    });
    await newBooking.save();

    res.status(200).send("Appeal accepted and booking created.");
  } catch (error) {
    res.status(500).send("Error processing acceptance: " + error.message);
  }
});



module.exports = router;
