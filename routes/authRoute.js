const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//routing

//register router

router.post("/register", registerController);

//login route
router.post("/login", loginController);

//forgot password 
router.post("/forgot-password" , forgotPasswordController)

// router.get("/protected" ,requireSignIn,isAdmin , testController) ;

//protected route to which takes care of jwt verification =>for user only

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true  });
});

// protected route for admin
router.get("/admin-auth", requireSignIn , isAdmin, (req, res) => {
  res.status(200).send({ ok: true,message:"you are admin" });
});

module.exports = router;
