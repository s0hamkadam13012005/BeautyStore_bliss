import Product from '../models/product.model.js';
import asyncHandler from 'express-async-handler';

const createProduct = asyncHandler(async (req, res) =>{

  const newProduct = await Product.create(req.body);

  const product = await newProduct.save();

  if(product){
    res.status(201).json(product);
    
  }
  else{
    res.status(400);
    throw new Error(" product not created");
  }
})


//Update Product

const updateProduct = asyncHandler(async(req,res)=>{
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {$set:req.body},
    {new:true}
  )

  if(!updatedProduct){
    res.status(404);
    throw new Error("Product not updated");

  }
  else{
    res.status(200).json(updatedProduct);
  }
})

/*
Breaking it down:

req.params.id

Grabs the product ID from the route, e.g., PUT /api/products/:id.

{ $set: req.body }

$set ensures only the fields in req.body are updated.

Prevents overwriting the whole document accidentally — very important in production.

{ new: true }

Makes Mongoose return the updated document instead of the old one.

Useful for sending back to the client immediately.*/

//Delete Product

const deleteProduct = asyncHandler(async(req,res)=>{
  const product = await Product.findByIdAndDelete(req.params.id);
  if(!product){
    res.status(404);
    throw new Error("Product not found");
  }
  else{
    res.status(200).json({message:"Product deleted successfully"});
  }
})


//getProduct

const getProduct = asyncHandler(async(req,res)=>{
  const product = await Product.findById(req.params.id);

  if(!product){
    res.status(404);
    throw new Error("Product not found")
  }
  else{
    res.status(200).json(product);
  }
})

const getALLproducts = asyncHandler(async(req,res)=>{
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qsearch = req.query.subcategory;

  let products;

  if(qNew){
    products = await Product.find().sort({createdAt:-1});
  }
  else if(qCategory){
    products = await Product.find({
      categories:{ $in:[qCategory]}
    })
    
  }

  else if(qsearch){
    products = await Product.find({
      $text:{
        $search:qsearch,
        $caseSensitive:false,
        $dicriticSensitive:false
      }
    })
  }
  else{
    products = await Product.find();
  }
})


const ratingProduct = asyncHandler(async(req,res)=>{

  let {star , name , comment , postedBy} = req.body;

  if( star && name  && comment && postedBy){

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      $push:{ratings:{star , name , comment , postedBy}}
    },
    {
      new:true
    }
  );
   res.status(201).json("was rated successfully");
  

}
else{
  res.status(400);
  throw new Error("product not rated");
}


})

export {createProduct, updateProduct, deleteProduct, getProduct, getALLproducts, ratingProduct}