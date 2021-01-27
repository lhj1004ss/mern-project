const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String
  },
  email: {
    type: String,
    unique: 1,
    trim:true,
  },
  password: {
    type: String,
  },
  image: String,
  role: {
    type: String,
    enum: ['Admin','User'],
    default: 'User'
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
},{timestamps: true});

const User = mongoose.model('User',userSchema);
module.exports = { User };