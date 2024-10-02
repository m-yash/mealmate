const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed'],
    default: 'pending',
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;