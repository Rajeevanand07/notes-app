const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


async function createUser(req, res) {
  const { email, userName, password } = req.body;

  const isUserExist = await UserModel.findOne({ email: email });

  if (isUserExist) {
    return res.json({
      message: "user already exists",
    });
  }

  const hashedPass = await bcrypt.hash(password, 10)

  const user = await UserModel.create({
    userName,
    email,
    password : hashedPass,
  });

  res.status(201).json({
    message: "User created successfully",
    user,
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body; //frontend se a raha hai
  const user = await UserModel.findOne({ email: email }); //ye DB se a raha hai
  if (!user) {
    //validation ( user )
    return res.send({
      message: "user not found",
    });
  }

  const correctPass = await bcrypt.compare(password, user.password)
  if (!correctPass) {
    //validation ( pass )
    return res.send({
      message: "password incorrect",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token",token)
  res.json({
    user: user
  });
}

async function logoutUser(req, res) {
  res.clearCookie("token");
  return res.json({message: "logout..!"});
}

async function getCurrentUser(req, res) {
  user = req.user
  console.log("current user", user);
  
  res.json({user:user})
}

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser
};
