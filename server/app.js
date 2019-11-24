'use strict'

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const userRoutes = require('./routes/user');
const questionRoutes = require('./routes/question');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
app.use(allowCrossDomain);

app.use('/api', userRoutes);
app.use('/api', questionRoutes);

app.get("/", (req, res) => {
  res.status(200).send({ message: "Welcome" });
});

module.exports = app;