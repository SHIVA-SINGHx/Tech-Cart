import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    ProfileImage: {
      type: String,
      default: "",
    },
    ProfilePicId: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },
    token: {
      type: String,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: null,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: Number,
    },
   phoneNo: {
      type: Number,
    },
    Otp: {
      type: String,
      default: null,
    },
    OtpExpiry: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
