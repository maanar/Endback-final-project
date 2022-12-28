const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  //refrence to user model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // website: {
  //   type: String,
  // },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  gander: {
    type: String,
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);

