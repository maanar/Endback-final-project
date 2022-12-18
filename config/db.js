const mongoose = require('mongoose');

const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log('MONGODB IS CONNECTED...');
  } catch (err) {
    console.error(err.message);
    //Exit the process
    process.exit(1);
  }
};
mongoose.set('strictQuery', false);
module.exports = connectDB;
