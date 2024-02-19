const { hashPassword, comparePassword } = require("../helper/authHelper");
const User = require("../model/userModel");
const Order = require("../model/orderModel");
const JWT = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, address ,answer} = req.body;

    if (!name || !email || !password || !address || !answer) {
      return res.status(400).json({
        success: false,
        message: "all field is required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User is already registered",
      });
    }

    const hashedPassword = await hashPassword(password);
    
    const user = await new User({
      name,
      email,
      password: hashedPassword,
      address,
      answer,
    }).save();

    return res.status(200).json({
      success: true,
      message: "user registerd successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in registrstion",
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).json({
        success: false,
        message: "please fill all field",
      });
    }

    //check user
    const user =await User.findOne({email:email });


    if (!user) {
      return res.status(400).json({
        success: false,
        message: "email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid password please enter correct password",
      });
    }

    const token = JWT.sign({ _id: user._id }, 
                            process.env.JWT_SECRET, {
                                    expiresIn: "2d",
                                    });
    return res.status(200).json({
    success:true,
    message:"login successfull",
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        address:user.address,
        role:user.role,
    },
    token:token,
    })                                
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in login",
      error: error.message,
    });
  }
};


//forgot password controller

exports.forgotPasswordController = async( req,res) => {

      try {
        const {email , answer , password }= req.body ;

        if(!email || !answer ||!password){
          res.status(404).json({
            success: false,
            message: "all field are required",
          });
        }

        const user = await User.findOne({email , answer})

        //validation

        if(!user) {
          res.status(404).json({
            success: false,
            message: "user not found",
          });
        }


        const hashed = await hashPassword(password);
        await User.findByIdAndUpdate(user._id, {password : hashed}) ;

        res.status(200).json({
          success: true,
          message: "password reset successfully",
        });
        
      } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "error in password change",
          error: error.message,
        });
        
      }
}

exports.testController = async(req,res) => {

    return res.json({
        sucess:true,
        message:"this is protected route"
    })
}

//update prfole
exports.updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await User.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//orders
exports.getOrdersController = async (req, res) => {
  try {
    const orders = await Order
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
      
    res.json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders
exports.getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};

//order status
exports.orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    console.log("this is status comming from the client",status,"this is status comming from the client")
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status:status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};