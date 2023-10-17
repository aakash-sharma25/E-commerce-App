const express = require("express");
const { createCategoryController, updateCategoryController, allcategoryController, singlecategoryController, deletecategoryController } = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//routes

router.post("/create-category",requireSignIn,isAdmin,createCategoryController);

router.put("/update-category/:id",requireSignIn,isAdmin,updateCategoryController);
router.get("/all-category",allcategoryController);
router.get("/single-category/:slug",singlecategoryController);
router.delete("/delete-category/:id",requireSignIn,isAdmin,deletecategoryController);

module.exports = router;