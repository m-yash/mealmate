const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const RequestSchema = new Schema({
//   user_id: {
//     type: Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true
//   },
//   location: {
//     lat: { type: Number, required: true },
//     lng: { type: Number, required: true }
//   },
//   food_preference: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'fulfilled', 'cancelled'],
//     default: 'pending'
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   },
//   chef_responses: [{
//     chef_id: { type: Schema.Types.ObjectId, ref: 'Chef' },
//     response_status: {
//       type: String,
//       enum: ['accepted', 'rejected'],
//       default: 'accepted'
//     }
//   }]
// });


// // Geospatial index for map-specific radius
// RequestSchema.index({ location: "2dsphere" });  

// const RequestSchema = new mongoose.Schema({
//   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   food_preference: String,
//   date: Date,
//   status: { type: String, default: 'pending' },
//   created_at: { type: Date, default: Date.now },
//   chef_responses: Array,
//   location: {
//     type: { type: String, default: 'Point' },
//     coordinates: { type: [Number], required: true, index: '2dsphere' }, // GeoJSON format
//   },
// });

// module.exports = mongoose.model('Request', RequestSchema);
onst RequestSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food_preference: { type: String, required: true }, // New field for the specific food name
  dietary_preference: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Other'], required: true },
  allergies: { type: [String] },
  spice_level: { type: String, enum: ['Mild Spicy', 'Medium Spicy', 'Extreme Spicy'], default: 'Mild' },
  budget: { type: Number, min: 0 }, // New field for budget, optional
  date: { type: Date, required: true }, // Date + time, with backend validation to enforce 10-day window
  time: { type: String, required: true },
  status: { type: String, default: 'pending' },
  created_at: { type: Date, default: Date.now },
  chef_responses: Array,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true, index: '2dsphere' }, // GeoJSON format
  },
});

module.exports = mongoose.model('Request', RequestSchema);
c