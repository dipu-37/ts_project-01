import app from "./app";
import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;

let server : Server;

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("🟢 Connected to MongoDB successfully");

    server = app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("🔴 MongoDB connection error:", error);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`😈 unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});