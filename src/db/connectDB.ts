import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect: () => Promise<void> = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
