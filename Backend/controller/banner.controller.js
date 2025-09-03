import Banner from "../models/banner.model.js";
import asyncHandler from "express-async-handler";

const createBanner = asyncHandler(async (req,res)=>{
  const newBanner = await Banner(req.body);
  const savedBanner = await newBanner.save();
  if(!savedBanner){
    res.status(400);
    throw new Error("Banner not created");
  }
  else{
    res.status(201).json("Banner created successfully");
  }
})

const deleteBanner = asyncHandler(async(req,res)=>{
   const banner = await Banner.findByIdAndDelete(req.params.id);
   if(!banner){
    res.status(404);
    throw new Error("Banner not found");
   }
   else{
    res.status(200).json("Banner deleted successfully");
   }
})

const getAllBanners = asyncHandler(async(req,res)=>{
  const banners = await Banner.find();
  if(!banners){
    res.status(404);
    throw new Error("No banner found");
  }
  else{
    res.status(200).json(banners)
  }
})


const getRandomBanner = asyncHandler(async(req,res)=>{
  const banners = await Banner.find();
  if(!banners){
    res.status(404);
    throw new Error("No banner found");
  }
  else{
    const randomIndex = Math.floor(Math.random() * banners.length);
    const randomBanner = banners[randomIndex];
    res.status(200).json(randomBanner);
  }
})

export {createBanner,deleteBanner,getAllBanners,getRandomBanner};