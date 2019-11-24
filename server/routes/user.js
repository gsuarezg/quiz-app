'use strict'

const express = require('express');
const userController = require('../controllers/user');
const api = express.Router();
const middlewareAuth = require('../middleware/authenticated');

api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);

module.exports = api;
