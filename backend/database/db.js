import mongoose from "mongoose";

export const ConnectDB = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/TechCart` )
    console.log(`MongoDB connected at ${process.env.PORT}`);
    
    } catch (error) {
        console.log("Failed to connect db", error);
        
    }
}