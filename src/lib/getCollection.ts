
import mongoose from "mongoose";
import { dbConnect } from "./dbConnect";

//reuseable getCollection function
export const getCollection = async (collectionName: string) => {
  await dbConnect(); // ensure connection
  const db = mongoose.connection.db; // get native mongo db instance
  if (!db) {
    throw new Error("Database connection is not established.");
  }
  console.log(`📁 Accessing collection: ${collectionName}`);
  return db.collection(collectionName); // get native collection
};

/**
 * ✅ Named collections
 */
export const collection = {
  user_collection: "users",
  applyForDoctor: 'applyForDoctors'
  
};
