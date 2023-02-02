const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
  
   if(conn){
    console.log("ket noi thanh cong")
   }
  };
  
  module.exports = connectDB;