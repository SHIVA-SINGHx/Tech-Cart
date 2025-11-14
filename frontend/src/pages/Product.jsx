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
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";


const Product = () => {
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [sortOrder, setSortOrder] =useState("")

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8082/api/v1/product/getallproducts"
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error("error hai")
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(allProducts.length === 0) return;

    let filtered = [...allProducts]
    
    if(search.trim() !== ""){
      filtered = filtered.filter(p=> p.productName?.toLowerCase().includes(search.toLowerCase()))
    }

    if(category !== "All"){
      filtered = filtered.filter(p=> p.category === category)
    }

    if(brand !== 'All'){
      filtered = filtered.filter(p=> p.brand === brand)

    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    if(sortOrder === 'lowerToHigh'){
      filtered.sort((a, b)=> a.price - b.price)
    } else if(sortOrder === 'highToLower'){
      filtered.sort((a, b) => b.price - a.price)
    }


  }, [])

  useEffect(() => {
    getAllProducts();
  }, []);

  console.log(allProducts);

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto flex gap-7">
        {/* Sidebar */}
        <FilterSideBar 
        allProducts={allProducts} 
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        search={search}
        setSearch={setSearch}
        brand={brand}
        setBrand={setBrand}
        category={category}
        setCategory={setCategory}
        />

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
            {allProducts.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              );
            })}
          </div>
        </div>
      </div>
      {/* <ToastBar /> */}
    </div>
  );
};

export default Product;
