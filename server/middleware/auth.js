const express = requre('express');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if(!token){
    return res.status(401).json({message:"No Token Available"});
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = { auth };