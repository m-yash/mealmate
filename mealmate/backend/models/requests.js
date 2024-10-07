const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  food_preference: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  chef_responses: [{
    chef_id: { type: Schema.Types.ObjectId, ref: 'Chef' },
    response_status: {
      type: String,
      enum: ['accepted', 'rejected'],
      default: 'accepted'
    }
  }]
});

module.exports = mongoose.model('Request', RequestSchema);