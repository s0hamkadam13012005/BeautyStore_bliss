import User from '../models/user.model.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';



const updateUser = asyncHandler(async(req,res)=>{
  if(req.body.password){
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {$set:req.body},
    {new:true}
  );

  if(!updateUser){
    res.status(404);
    throw new Error("User not updated");
  }
  else{
    res.status(201).json(updatedUser);
  }
})

//Delete User

const deleteUser = asyncHandler(async(req,res)=>{
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if(!deletedUser){
    res.status(404);
    throw new Error("User not deleted");
  }
  else{
    res.status(201).json("User deleted successfully");
  }
})

//getUser single user

const getUser = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id);
  if(!user){
    res.status(404);
    throw new Error("User not found");
  }
  else{
    res.status(200).json(user);
  }
})


//getAllUsers

const getALLUsers = asyncHandler(async(req,res)=>{
  const users = await User.find();
  if(!users){
    res.status(404);
    throw new Error("No user found");
  }
  else{
    res.status(200).json(users);
  }
})


export {updateUser,deleteUser,getUser,getALLUsers};