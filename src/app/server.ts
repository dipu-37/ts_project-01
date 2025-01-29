import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("🟢 Connected to MongoDB successfully");

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("🔴 MongoDB connection error:", error);
    process.exit(1); 
  }
}

main();
