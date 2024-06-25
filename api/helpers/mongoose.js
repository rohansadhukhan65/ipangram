import mongoose from "mongoose";
// db start command in ubuntu :: sudo mongod --dbpath /var/lib/mongodb --port 27017
const MONGODB_URI = "mongodb://localhost:27017/ipangram";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("database connected !");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
