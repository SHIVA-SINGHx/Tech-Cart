import React, {} from "react";

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
// import axios from "axios";

const Product = () => {
  // const [allProducts, setAllProdcuts] = useState()

  // const getAllProducts = async ()=>{
  //   const res = await axios.get(``)
  // }


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
              [1,2,3,4].map((product)=>{
                return product
              })
            }
          </div>

        </div>
      </div>
    </div>
  );
};

export default Product;
