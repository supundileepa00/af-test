const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
