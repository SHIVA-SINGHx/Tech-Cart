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
import { API_URL } from "@/lib/api";
import { PackageOpen } from "lucide-react";

const Product = () => {
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/v1/product/getallproducts`);
      if (res.data.success) {
        setAllProducts(res.data.products || []);
        dispatch(setProducts(res.data.products || []));
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to fetch products from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(setProducts([]));
      return;
    }

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    dispatch(setProducts(filtered));
  }, [search, category, brand, allProducts, priceRange, sortOrder, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto flex gap-7 px-4 sm:px-6">
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

        {/* Main product section */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-semibold text-gray-800">{products.length}</span> products
            </p>
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product grid or empty state */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="shadow-lg rounded-lg p-3 space-y-3 border border-gray-100">
                  <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-lg" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <PackageOpen className="w-16 h-16 text-gray-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-700">No Products Found</h3>
              <p className="text-sm text-gray-500 max-w-md mt-1">
                {allProducts.length === 0
                  ? "No products available in the database yet."
                  : "No products match your active search or filters. Try adjusting your filters."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => {
                return (
                  <ProductCard
                    key={product._id}
                    product={product}
                    loading={loading}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
