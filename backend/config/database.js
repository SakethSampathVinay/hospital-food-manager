import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected Successfully");
    } catch(error) {
        console.log("Error Connecting to Error", error)
    }
}

export default connectToDB;