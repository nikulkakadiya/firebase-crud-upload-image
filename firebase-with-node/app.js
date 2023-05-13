const express = require('express');
const userRoute = require('./routes/userRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/profile', express.static('upload/images'));
app.use('/users',userRoute);


module.exports = app;