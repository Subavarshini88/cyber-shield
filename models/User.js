const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
  age: Number,
  occupation: String,
  state: String
});

module.exports = mongoose.model('User', userSchema);