const express = require("express");
const { createCategoryController } = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//routes

router.post("/create-category",requireSignIn,isAdmin,createCategoryController);

module.exports = router;