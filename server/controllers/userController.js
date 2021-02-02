const { User } = require('../models/user')

const createUser = async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body;
  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ msg: "Please fill out all the blanks" });
  }
  try {
    const newUser =  await User.create(req.body);
    console.log('newUser', newUser)
    res.status(201).json(newUser);    
  } catch (error) {
    next(error);
  }
}

const loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "your E-mail is NOT vaild",
      });
    }
    //@@ desc if there is email from database check password
    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log(isMatch);
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Please try another Password",
        });
    });
   //@@ desc if password and email are correct, make token
    user.generateToken((err, user) => {
      if (err) return res.status(400).send(err);
      res
        .cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    });
  });
}

const auth = (req, res) => {

  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname
  })
}

const logout = (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id}, { token: ""}, (err,user)=>{
    if(err) return res.json({ success: false, err});
    return res.status(200).send({
      success: true
    })
  })
}

module.exports = {
  createUser,
  loginUser,
  auth,
  logout
}