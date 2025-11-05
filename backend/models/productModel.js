import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImg: [
      {
        url: { type: String, required: true },
        public_Id: { type: String, required: true },
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    category: { type: String },
    brand: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema)
