import express, { json } from "express";
import getDataUri from "../utils/dataUri.js";
import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

export const addProduct = async (req, res) => {
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
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "mern_products", // folder name of cloudinary
        });

        productImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const newProduct = await Product.create({
      userId,
      productName,
      productDescription,
      price,
      brand,
      category,
      productImg, // array of objects
    });

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
        products: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetch successfully",
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // delete images from cloudninary

    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }
    // delete img frm mongodb to
    await Product.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params; 
    const {
      productName,
      productDescription,
      category,
      brand,
      price,
      existingImages,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let updatedImg = [];

    // Keep selected old images
    if (existingImages) {
      const keepIds = JSON.parse(existingImages);
      updatedImg = product.productImg.filter((img) =>
        keepIds.includes(img.public_id)
      );

      // Remove unselected images from Cloudinary
      const removedImage = product.productImg.filter(
        (img) => !keepIds.includes(img.public_id)
      );

      for (let img of removedImage) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImg = product.productImg;
    }

    // Upload new images if any
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUrl = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUrl, {
          folder: "mern_products",
        });
        updatedImg.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    // Update fields
    product.productName = productName || product.productName;
    product.productDescription = productDescription || product.productDescription;
    product.price = price || product.price;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.productImg = updatedImg;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
