const jwt = require("jsonwebtoken");
const { User } = require("../Models/UserSchema");
require("dotenv").config();

let admin = async (req, res, next) => {
  try {
    const { user } = req;

    const authUser = await User.findById(user);

    //check if this is an admin

    if (authUser.role === 0) {
      req.admin = false;
      next();
    }

    req.admin = true;

    next();
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Sorry you're not authenticated1",
    });
  }
};

module.exports = { admin };
