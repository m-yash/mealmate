const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  },
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to 'User' with a role of 'chef'
    required: true,
  },
  response_status: {
    type: String,
    enum: ['accepted', 'rejected'],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const UserResponse = mongoose.model('UserResponse', UserResponseSchema);

module.exports = UserResponse;
