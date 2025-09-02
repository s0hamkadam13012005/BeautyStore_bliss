import app from './app.js';
import dotenv from 'dotenv';
import {dbConnection} from './utils/db.js';
dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT,()=>{
  console.log(`app is running on port ${PORT}`);
  dbConnection();
})

