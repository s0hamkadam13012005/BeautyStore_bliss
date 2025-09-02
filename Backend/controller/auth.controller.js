import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import generateToken from "../Middleware/generateToken.js";

//Register User
// POST /api/auth/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExsits = await User.findOne({ email });

  if (userExsits) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//Login User
// POST /api/v1/auth/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email,password } = req.body;

  const user = await User.findOne({
    email,
    
  });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//LogOut User
// POST /api/v1/auth/logout
//@access Public

const logoutUser = asyncHandler(async(req,res)=>{
  res.cookie("jwt"," ",{
    httpOnly:true,
    expires:new Date(0)
  })

  res.status(200).json({message:"User logged out"})
});

export { registerUser, loginUser ,logoutUser};