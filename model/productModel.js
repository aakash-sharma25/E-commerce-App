const mongoose = require("mongoose") ;

const productSchema = mongoose.Schema({

    name:{
        type:String,
        required:true,

    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    photo:{
       data:Buffer,
        contentType:String,
    },
    shipping:{
        type:Boolean,

    }
}, {timestamps:true} )

const Product = mongoose.model("Product",productSchema);

module.exports = Product ;