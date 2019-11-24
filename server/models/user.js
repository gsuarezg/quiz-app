"use strict";

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const validRoles = {
  values: ["ADMIN", "PLAYER"],
  message: "{VALUE} is not a permitted role."
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is mandatory"]
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"]
  },
  role: {
    type: String,
    required: true,
    default: "PLAYER",
    enum: validRoles
  },
});

userSchema.plugin(uniqueValidator, {
  message: "{PATH} must be unique"
});

module.exports = mongoose.model("User", userSchema);
