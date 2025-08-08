// lib/dbConnect.ts
import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!mongoURI) {
  throw new Error("❌ MONGODB_URI env variable missing");
}
if (!dbName) {
  throw new Error("❌ DB_NAME env variable missing");
}

// Cache system for mongoose (Next.js hot reload এ সমস্যা এড়ানোর জন্য)
let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("🟢 MongoDB already connected (cached)");
    return;
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(mongoURI, {
      dbName: dbName,
    });
    isConnected = true;
    console.log("✅ Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};
