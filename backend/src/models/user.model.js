const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  email: String,
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
