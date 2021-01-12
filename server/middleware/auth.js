const {User} = require('../models/user');

let auth = (req, res, next) => {
  // bring cookie from client
  let token = req.cookies.x_auth;  
// find an user
  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({isAuth: false, error: true});
    
    req.token = token;
    req.user = user;
    next();
  })
}

module.exports = { auth };