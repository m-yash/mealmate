// remove chef model
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  chef_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Changed to reference 'User' instead of 'Chef'
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;


// old
// const mongoose = require('mongoose');

// const ReviewSchema = new mongoose.Schema({
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
//   rating: {
//     type: Number,
//     required: true,
//     min: 1,
//     max: 5,
//   },
//   comments: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Review = mongoose.model('Review', ReviewSchema);

// module.exports = Review;
