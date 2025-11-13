import React from 'react'
import { Input } from './ui/input';

const FilterSideBar = ({allProducts}) => {

  const Categories = allProducts.map(c=> c.category);
  const uniqueCategory = ["All", ...new Set(Categories)]
  console.log(uniqueCategory);

  const Brands = allProducts.map(b=> b.brand);
  const uniqueBrand = ["All", ...new Set(Brands)]
  console.log(uniqueBrand);

  return (
    <div className='bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block w-64'>
      {/* Search */}
      <Input type='text' placeholder='Search...' className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'/>

      {/* Category */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {
          uniqueCategory.map((item, index)=>(
            <div key={index} className='flex items-center gap-2'>
              <input type="radio" />
              <label htmlFor="">{item}</label>
            </div>
          ))
        }
      </div>

      {/* Brands */}
      <h1 className='mt-5 font-semibold text-xl'>Brand</h1>
      <select className='bg-white w-full p-2 border-gray-200 border-2 rounded-md'>
        {
          uniqueBrand.map((item, index)=>{
            return <option key={index}>{item.toUpperCase()}</option>
          })
        }
      </select>

    </div>
  )
}

export default FilterSideBar
