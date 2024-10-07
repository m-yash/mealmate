const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  request_id: {
    type: Schema.Types.ObjectId,
    ref: 'Request',
    required: true
  },
  chef_id: {
    type: Schema.Types.ObjectId,
    ref: 'Chef',
    required: true
  },
  status: {
    type: String,
    enum: ['sent', 'viewed', 'responded'],
    default: 'sent'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', NotificationSchema);
