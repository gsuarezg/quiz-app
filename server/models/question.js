"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const questionSchema = schema({
  question: String,
  answers: [{
      answer: String,
      correct: Boolean
  }]
});

module.exports = mongoose.model("Question", questionSchema, 'question');
