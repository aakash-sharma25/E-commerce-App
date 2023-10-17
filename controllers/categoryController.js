const { default: slugify } = require("slugify");
const Category = require("../model/categoryModel")

exports.createCategoryController = async(req,res) => {

    try {

        const {name} = req.body;

        if(!name) {
            res.status(400).json({
              success: false,
              message: "Please enter the category",
            });
        }

        const existingCategory = await Category.findOne({name});
        if(existingCategory) {
            res.status(400).json({
                success: false,
                message: "Category already exist",
              });
        }

        const category = await new Category({name , slug:slugify(name)}).save() ;

        res.status(200).json({
            success: true,
            message: "new category created",
            category,
          });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "error in creating category",
          error: error.message,
        });
        
    }

}


exports.updateCategoryController = async(req,res) => {

  try {
    const {id} = req.params;
    const {name} = req.body ;
    const category = await Category.findByIdAndUpdate(id,{name , slug:slugify(name)},{new:true});

        res.status(200).json({
          success: true,
          message: "categoty updated successfully",
          category,
        });
    
  } catch (error) {
    console.log(error);
        res.status(500).json({
          success: false,
          message: "error in updating category",
          error: error.message,
        });
    
  }
}

exports.allcategoryController =async(req,res) => {

  try {

    const allCategories = await Category.find({});

    res.status(200).json({
      success: true,
      message: "All category fetched successfuly",
      allCategories,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in getiing all category",
      error: error.message,
    });
  }
}


exports.singlecategoryController =async(req,res) => {

  try {

    const {slug} = req.params;
    const category = await Category.findOne({slug:slug});

    res.status(200).json({
      success: true,
      message: "Fetched the given category",
      category,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in getiing the given category",
      error: error.message,
    });
  }
}


exports.deletecategoryController =async(req,res) => {

  try {

    const {id} = req.params;
    const category = await Category.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted the given category",
      category,
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in getiing the given category",
      error: error.message,
    });
  }
}