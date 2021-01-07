const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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

userSchema.pre('save', function(next){

  var user = this;
  // only when password changed, this function works
  if(user.isModified('password')){
    bcrypt.genSalt(saltRounds,function(err, salt){
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      // successfully make hash? then assign hash to plain password
      user.password = hash;
      next();
      })
    })
  }else{
    next();
  }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
  bcrypt.compare(plainPassword, this.password, function(err, isMatch){
    if(err) return cb(err);
    cb(null, isMatch);
  }) 
}

userSchema.methods.generateToken = function(cb){
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function(err,user){
    if(err) return cb(err);
    cb(null, user);
  });
}

const User = mongoose.model('User',userSchema);
module.exports = { User };