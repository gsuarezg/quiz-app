'use strict'

const express = require('express');
const questionController = require('../controllers/question');
const api = express.Router();
const middlewareAuth = require('../middleware/authenticated');

api.post('/question', middlewareAuth.ensureAuth, questionController.saveQuestion);
api.get('/questions/', middlewareAuth.ensureAuth, questionController.getQuestions);
api.put('/question/:id', middlewareAuth.ensureAuth, questionController.saveQuestion);
api.delete('/question/:id', middlewareAuth.ensureAuth, questionController.deleteQuestion);

module.exports = api;