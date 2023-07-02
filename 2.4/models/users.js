const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});
const userSchema = new Schema({
  login: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: [taskSchema],
});

const User = model("User", userSchema);

module.exports = User;
