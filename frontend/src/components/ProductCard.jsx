import { ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const { productName, price, productImg } = product;
  const accessToken = localStorage.getItem("accessToken")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addToCart = async(productId)=>{
    try {
      const res = axios.post(`http://localhost:8082/api/v1/cart/add`, {productId}, {
        headers:{
          Authorization: `Bearer ${accessToken} `
        }
      })
      if((await res).data.success){
        toast.success("Product added successfully")
        dispatch(setCart((await res).data.cart))
      }
      
    } catch (error) {
      console.log(error.message)
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
          <Button onClick={()=> addToCart(product._id)} className="bg-pink-600 mb-3 w-full">
            <ShoppingCart />
            Add to cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
