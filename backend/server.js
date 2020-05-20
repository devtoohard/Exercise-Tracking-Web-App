const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// configures env variables in dotenv file
require('dotenv').config();

//creates express server 
const app = express();
const port = process.env.PORT || 5000;

// middleware // 
app.use(cors());
app.use(express.json()); 

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('connection established successfully');
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


//starts server 
app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});



