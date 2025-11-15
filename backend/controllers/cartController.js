import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.json({ success: true, cart: [] });
    }
    return res.status(200).json({ success: true, cart });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addCart = async (req, res) => {
  try {
    const { userId } = req.id;
    const { productId } = req.body;

    // check if product exists?
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });
    }

    // find the user's cart if it is exists?
    let cart = await Cart.findOne({ userId });

    // if Cart does'nt exist?
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1, price: product.price }],
        totalPrice: product.price,
      });
    } else {
      // find if the product is already exixts in cart?
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // if product exists -> just increase quantity
        cart.items[itemIndex].quantity += 1;
      } else {
        // if new product -> push to cart

        cart.items.push({
          productId,
          quantity: 1,
          price: product.price,
        });
      }

      // Recalculate total price

      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity
      );
    }

    // save cart
    await cart.save();

    // populate product details before sending response

    const populateCart = await Cart.findById(cart._id).populate(
      "items.productId"
    );

    return res.status(200).json({
      success: true,
      message: "Product added in Cart Successfully",
      cart: populateCart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
