"use strict";

var Question = require("../models/question");

var saveQuestion = (req, res) => {
  let question = new Question();
  let params = req.body;
  console.log(params);

  question.question = params.question;

  if (params.answers !== null && params.answers.length > 0) {
    question.save((err, questStored) => {
      if (err) {
        res.status(500).send({ message: "Error saving question." });
      } else {
        if (!questStored) {
          res.status(404).send({ message: "Question not saved." });
        } else {
          res.status(200).send({ question: questStored });
        }
      }
    });
  } else {
    res.status(500).send({ message: "Answers are mandatory." });
  }
}

var getQuestions = (req, res) => {
  Question.find({}).then((result) => {
    console.log("find All", result);
    if (!result) {
      res.status(404).send({
        message: "There is no questions!"
      });
    }

    return res.status(200).send({
      total: result.total,
      questions: result.docs
    });
  });
};

module.exports = {
  saveQuestion,
  getQuestions,
};
