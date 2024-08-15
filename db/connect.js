const mongoose=require("mongoose");

const connectDB=(uri)=>{
    console.log("hello")
    return mongoose.connect(uri).then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
}
module.exports=connectDB;
