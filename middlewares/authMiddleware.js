const JWT = require("jsonwebtoken");
const User = require("../model/userModel");

//protected routes token based

exports.requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in authorization",
      error: error.message,
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user?.role !== 1) {
      res.status(404).json({
        success: false,
        message: "You Are Not a Admin ",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "This is protected route for admin",
      error: error.message,
    });
  }
};
