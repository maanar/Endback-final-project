//Schema which just holds the different fiels that we want

const mongoose = require('mongoose');

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
  password: {
    type: String,
    required: true,
  },
  avatar: {
    // it allows u to attach a profile image to ur email , accssible
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  role: {  //new
    type: String,
    enum: ['user' , 'admin'],
    default: 'user'
  }, },
  { timestamps: true });

});
module.exports = User = mongoose.model('user', UserSchema);
