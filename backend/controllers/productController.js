import express from "express";
import getDataUri from "../utils/dataUri";
import cloudniary from "cloudinary"
import { Product } from "../models/productModel";

export const getProduct = async (req, res) => {
  try {
    const { productName, productDescription, price, category, brand } =
      req.body;
    const userId = req.id;

    if (!productName || !productDescription || !price || !category || !brand) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // handle multiple images
    let productImg = []; 
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
          const fileUri = getDataUri(file)
          const result = await cloudniary.upload(fileUri,{
            folder: "mern_products" // folder name of cloudinary
          })

          productImg.push({
            url: result.secure_url,
            public_id: result.public_id
          })
      }
    }

    const newProduct = await Product.create({
        userId,
        productName,
        productDescription,
        price,
        brand,
        category,
        productImg  // array of objects 
    })

    return res.status(200).json({
        success: true,
        message: "Product created successfully",
        product: newProduct
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
