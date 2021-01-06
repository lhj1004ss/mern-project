const express = require('express')
const mongoose = require('mongoose');
const app = express()
const PORT=5000;

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
}).then(() => {console.log("MongoDB is successfully connected")}).catch(err =>{ console.log(`Something occurred ${err}`)})

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(PORT,()=>{console.log(`Serever is successfully connected on ${PORT}`)});