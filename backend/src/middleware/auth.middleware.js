const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

async function userAuth(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      message: "user is not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); //698583561a532980593d20ad
    const user = await UserModel.findOne({_id : decoded.id}) //698583561a532980593d20ad (DB)  === 698583561a532980593d20ad (jwt)
    req.user = user
    next()
    
  } catch (error) {
    return res.status(401).json({
      message: "jwt token is not correct",
    });
  }
}

module.exports = userAuth