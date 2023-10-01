const mongoose = require("mongoose") ;

const categorySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },
    slug : {
        type:String,
        lowercase:true,
    }
})

const Category = mongoose.model("Category" , categorySchema);

module.exports = Category ;



