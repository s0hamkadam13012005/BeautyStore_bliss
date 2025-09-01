import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();



const dbConnection = async()=>{
const DB = process.env.DB;
  try{
    await mongoose.connect(DB);
    console.log("DB connected successfully",DB)
  }

  catch(err){
    console.log("DB connection failed", err);
    setTimeout(dbConnection,5000);
  }
}

export default dbConnection;   // <-- D