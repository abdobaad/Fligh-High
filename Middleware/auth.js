const jwt = require("jsonwebtoken");

require("dotenv").config();

let auth = async (req, res, next) => {
  try {
    const authToken = await req.headers.cookie.split("=")[1];
    // is the token exists
    if (!authToken) {
      res.user = null;
      next();
    }
    //is the token correct
    const userData = await jwt.verify(authToken, process.env.PRIVATE_KEY);
    req.user = userData._id;
    next();
  } catch (error) {
    res.status(400).json({
      error: true,
      message: "Not authenticated!",
    });
  }
};

module.exports = { auth };
