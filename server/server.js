const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./routes/user');
const app = express()

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: true,
//   credentials: true,
// }));
app.use(morgan("dev"));

// @@ desc mongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}).then(() => { console.log("MongoDB is successfully connected") }).catch(err => { next(err); })

// @@ desc routes
app.use('/api/users', userRoutes);

// @@ desc global error handler
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
})

app.listen(PORT, () => { console.log(`Serever is successfully connected on ${PORT}`) });