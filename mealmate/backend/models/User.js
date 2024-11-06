const mongoose = require('mongoose');

// implementation for remove chef model
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password_hash: {
    type: String,
    required: true,
  },
  phone: {
    type: Number, 
    required: true,
  },
  location: {
    type: {
      type: String,  // 'Point'
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],  // [longitude, latitude]
      required: true,
    },
  },
  role: {
    type: String,
    enum: ['user', 'chef'],
    default: 'user',  // Default role as 'user'
  },
  food_handling_certificates: {
    type: [String],  // Array to store multiple certificate URLs
    required: false,  // Optional at signup
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});


// GeoJSON working
// // new schema
// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password_hash: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: Number, 
//     required: true,
//   },
//   // location: {
//   //   lat: {
//   //     type: Number,
//   //     required: true,
//   //   },
//   //   lng: {
//   //     type: Number,
//   //     required: true,
//   //   },
//   // },
//   location: {
//     type: {
//       type: String,  // 'Point'
//       enum: ['Point'],
//       required: true,
//     },
//     coordinates: {
//       type: [Number],  // [longitude, latitude]
//       required: true,
//     },
//   },
//   role: {
//     type: String,
//     enum: ['user', 'chef'],
//     required: true,
//   },
//   // Fields for chefs only
//   // availability: {
//   //   type: Boolean,
//   //   default: false,
//   //   required: function() {
//   //     return this.role === 'chef';
//   //   },
//   // },
//   food_handling_certificates: {
//     type: [String],  // Array to store multiple certificate URLs
//     required: function() {
//       return this.role === 'chef';
//     },
//   },
//   reviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Review',
//     },
//   ],
// });


// old schema

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password_hash: {
//     type: String,
//     required: true,
//   },
//   location: {
//     lat: {
//       type: Number,
//       required: true,
//     },
//     lng: {
//       type: Number,
//       required: true,
//     },
//   },
//   role: {
//     type: String,
//     enum: ['user', 'chef'],
//     required: true,
//   },
//   reviews: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Review',
//     },
//   ],
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;