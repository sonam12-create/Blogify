import { decrypt } from "dotenv";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected SuccessFully 🥳🥳");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
