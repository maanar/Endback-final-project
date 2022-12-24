const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  //refrence to user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
