const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const { auth } = require('./middleware/auth')
const { User } = require('./models/user');


const app = express()

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {console.log("MongoDB is successfully connected")}).catch(err =>{ console.log(`Something occurred ${err}`)})

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

// @@ get test for front
app.get('/api/test', (req,res) => {
  res.send("test for frontend");
})

// @@ post register
app.post('/api/users/register',(req,res) => {
  const user = new User(req.body);
  user.save((err, userInfo)=>{
    if(err) {
      console.log(`Something occurred${err}`);
      return res.json(400);
  };
    return res.status(200).json({success: true})
  });
});

// @@ post login
app.post('/api/users/login',(req,res) => {
  User.findOne({ email:req.body.email}, (err,user) => {
    // if no vaild user
    if(!user){
      return res.json({
        loginSuccess: false,
        message:'there no vaild email you try to login'
      });
    }
    // password check
    user.comparePassword(req.body.password, (err,isMatch) => {
      if(err){
        console.log(err);
      }
      if(!isMatch){
        return res.json({loginSuccess: false, message:'Password is not Match'})
      }

      // if password is match, make token
      user.generateToken((err,user) => { 
        if(err) return res.status(400).send(err);

        //save token into cookie
        res.cookie("x_auth",user.token).status(200).json({loginSuccess: true, userId: user._id});
      })

    })
  })
})

// @@ get auth
app.get('/api/users/auth', auth,(req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    firstname: req.user.firstname,
    lastname: req.user.lastname
  })
})

// @@ get logout
app.get('/api/users/logout', auth,(req, res) => {
  console.log('req.user', req.user);
  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err, user) => {
      if(err) return res.json({ success: false, err});
      return res.status(200).send({success: true})
    })
})

app.listen(PORT,()=>{console.log(`Serever is successfully connected on ${PORT}`)});