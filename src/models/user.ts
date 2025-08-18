import  { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role:{
      type: String,
      enum:['admin','doctor','patient','staff'],
      default:'patient'
    }
  },
  {
    timestamps: true,
  }
);

// prevent model overwrite in dev
export const User = models.User || model("User", userSchema);
