import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart as addToCartAction } from "@/redux/cartSlice";

const ProductCard = ({ product, loading }) => {
  const { productName, price, productImg } = product;
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);


  const addToCart = async(productId)=>{
    try {
      const res = await axios.post(`https://tech-cart-onc2.vercel.app/api/v1/cart/add`, {productId}, {
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success){
        toast.success("Product added successfully")
        // Dispatching the cart object which contains { items, totalPrice, etc }
        dispatch(addToCartAction(res.data.cart))
      }
      
    } catch (error) {
      console.log(error.response?.data || error.message)
      toast.error("Failed to add product to cart")
    }
  }

  return (
    <div className="shadow-lg rounded-lg overflow-hidden h-max">
      <div className="w-full aspect-square overflow-hidden">
        {loading ? (
          <Skeleton className="w-full h-full rounded-lg" />
        ) : (
          <img
            src={productImg[0]?.url}
            alt=""
            className="w-full h-full transition-transform duration-300 hover:scale-105"
          />
        )}
      </div>
      {loading ? (
        <div className="px-2 space-y-2 my-2">
          <Skeleton className=" w-[200px] h-4" />
          <Skeleton className=" w-[100px] h-4" />
          <Skeleton className=" w-[150px] h-8" />
        </div>
      ) : (
        <div className="px-2 space-y-1">
          <h1 className="font-semibold h-12 line-clamp-2">{productName}</h1>
          <h2 className="font-bold">₹{price}</h2>
          <Button onClick={()=> (addToCart(product._id))} className="bg-pink-600 mb-3 w-full">
            <ShoppingCart />
            Add to cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
