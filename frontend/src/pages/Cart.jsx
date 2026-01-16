import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { useSelector} from "react-redux";
import userlogo from "@/assets/user.avif";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart } from "lucide-react";

const Cart = () => {
  const cart = useSelector((store) => store.product);
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (productId, change) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const newQuantity = current + change;
      if (newQuantity > 0) {
        return { ...prev, [productId]: newQuantity };
      }
      return prev;
    });
  };

  const getQuantity = (productId) => quantities[productId] || 1;

  const calculateSubtotal = () => {
    return cart?.products?.reduce((total, product) => {
      return total + product.price * getQuantity(product._id);
    }, 0) || 0;
  };

  const subtotal = calculateSubtotal();
  const tax = Math.round(subtotal * 0.18);
  const platfromFee = 50;
  const total = subtotal + tax + platfromFee;

  return (
    <div className="pt-20 pb-20 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart?.products?.length > 0 ? (
          <>
            <div className="flex items-center gap-3 mb-8">
              <ShoppingCart className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
              <span className="ml-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                {cart.products.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.products.map((product) => {
                  const quantity = getQuantity(product._id);
                  const itemTotal = product.price * quantity;

                  return (
                    <Card
                      key={product._id}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={product?.productImg?.[0]?.url || userlogo}
                            alt={product.productName}
                            className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg bg-gray-200"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                            {product.productName}
                          </h2>
                          <p className="text-sm text-gray-500 mb-3">
                            {product.category && (
                              <span className="inline-block bg-gray-200 px-2 py-1 rounded text-xs">
                                {product.category}
                              </span>
                            )}
                          </p>
                          <p className="text-2xl font-bold text-blue-600">
                            ₹{product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                          {/* Quantity Control */}
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2 w-fit">
                            <Button
                              onClick={() =>
                                handleQuantityChange(product._id, -1)
                              }
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                            >
                              −
                            </Button>
                            <span className="w-8 text-center font-semibold text-gray-900">
                              {quantity}
                            </span>
                            <Button
                              onClick={() =>
                                handleQuantityChange(product._id, 1)
                              }
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-gray-200"
                            >
                              +
                            </Button>
                          </div>

                          {/* Item Total */}
                          <div className="flex flex-col items-end">
                            <p className="text-sm text-gray-500">Subtotal</p>
                            <p className="text-2xl font-bold text-gray-900">
                              ₹{itemTotal.toLocaleString()}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:bg-red-50 h-10 w-10"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                      Order Summary
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900 font-semibold">
                          ₹{subtotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax (18% GST)</span>
                        <span className="text-gray-900 font-semibold">
                          ₹{tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Platform fee (50.0)</span>
                        <span className="text-gray-900 font-semibold">
                          ₹{platfromFee.toLocaleString()}
                        </span>
                      </div>

                      <div className="h-px bg-gray-200"></div>

                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          ₹{total.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200">
                      Proceed to Checkout
                    </Button>

                    <button className="w-full mt-3 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200">
                      Continue Shopping
                    </button>
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <ShoppingCart className="w-20 h-20 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add some items to get started!
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
