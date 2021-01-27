const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;


//@@ desc GET get all users
router.get('/', async(req, res, next) => {
  try {
    const users = await User.find();
    if(!users) throw Error("No User Available");
    res.status(200).json(users);
  } catch (error) {
    next(error);
    res.status(400).send();
  }
})

//@@ desc POST register user
router.post('/register', async(req, res, next) => {
  const { email, firstname, lastname, password } = req.body;
  if(!email || !firstname || !lastname || !password){
    return res.status(400).json({message:"Please fill out all blanks"});
  }
//@@ desc if same email
  User.findOne({ email }).then(user => {
    if(user) return res.status(400).json({message:"Please try another Email"});
    try {
      //@@ desc new email
    const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save().then(user => {
        jwt.sign(
          {id: user.id},
          JWT_SECRET,
          {expiresIn: "5h"},
          (err, token) => {
            if(err) throw err;
            res.status(200).json({
              token,
              id: user.id,
              name: user.firstname,
              email: user.email
            })
          }
        )
      }) 
    })
  })     
    } catch (error) {
      next(error);
    }

  });
})

module.exports = router;