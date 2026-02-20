import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("mongodb connected successfully");
    } catch(err){
        console.log("db connection fail");
        console.log(err.message);
        // process.exit(1);
    }
}