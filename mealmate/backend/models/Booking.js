// remove chef model
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  request_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request', // Reference to the food request
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

// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   chef_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',  // Changed to reference 'User' instead of 'Chef'
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'completed'],
//     default: 'pending',
//   },
// });

// const Booking = mongoose.model('Booking', BookingSchema);

// module.exports = Booking;

// old
// const mongoose = require('mongoose');

// const BookingSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   chef_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Chef',
//     required: true,
//   },
//   date: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'accepted', 'completed'],
//     default: 'pending',
//   },
// });

// const Booking = mongoose.model('Booking', BookingSchema);

// module.exports = Booking;
