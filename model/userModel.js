const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
       
    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0,
    },
},{timestamps:true});

const User = mongoose.model("User", userSchema);
module.exports = User;
