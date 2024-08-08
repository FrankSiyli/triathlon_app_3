import mongoose, { Schema, models } from "mongoose";
import { PlansSchema } from "../schemas/PlansSchema";


const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, 
    },
    password: {
      type: String,
      required: true,
    },
    trainingPlans: [PlansSchema],
    heartRate: {
      type: Number,
      default: 160,
    },
    watt: {
      type: Number,
      default: 120,
    },
    swimTime: {
      type: Number,
      default: 1200,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: {
      type: String,
      default: "",
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null, // Use null instead of empty string
    },
    verifyToken: {
      type: String,
      default: "",
    },
    verifyTokenExpiry: {
      type: Date,
      default: null, // Use null instead of empty string
    },
  },
  { timestamps: true } // Automatically handles createdAt and updatedAt
);

// Create and export User model
const User = models.User || mongoose.model("User", UserSchema);

export default User;
