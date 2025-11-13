import React, { useEffect, useState } from "react";

import FilterSideBar from "@/components/FilterSideBar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import ProductCard from "@/components/ProductCard";


const Product = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  const getAllProducts = async ()=>{
    try {
      setLoading(true)
      const res = await axios.get('http://localhost:8082/api/v1/product/getallproducts')
      if(res.data.success){
        setAllProducts(res.data.products)
      }
    } catch (error) {
      console.log(error);
      
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  console.log(allProducts);
  


  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Sidebar */}
        <FilterSideBar />

        {/* Main product seciton */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-end mb-4">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
                  <SelectItem value="hightolow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {
              allProducts.map((product)=>{
                return <ProductCard key={product._id} product={product} loading={loading}/>
              })
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
