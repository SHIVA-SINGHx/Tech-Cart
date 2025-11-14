import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

const FilterSideBar = ({allProducts, priceRange, search, setSearch, brand, setBrand, category, setCategory, setPriceRange }) => {

  const Categories = allProducts.map(c=> c.category);
  const uniqueCategory = ["All", ...new Set(Categories)]

  const Brands = allProducts.map(b=> b.brand);
  const uniqueBrand = ["All", ...new Set(Brands)]

  const handleCategoryClick = (val)=>{
    setCategory(val)
  }

  const handleBrandChange = (e)=>{
    setBrand(e.target.value)
  }

  const handleMinChange = (e)=>{
    const value = Number(e.target.value)
    if(value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]])
    }
  }


  const handleMaxChange = (e)=>{
    const value = Number(e.target.value)
    if(value >= priceRange[0]) {
      setPriceRange([priceRange[0], value])
    }
  }

  const handleResetFilters = () => {
    setSearch('')
    setCategory('All')
    setBrand('All')
    setPriceRange([0, 5000])
  }

  return (
    <div className='bg-gray-100 mt-10 p-1 rounded-md h-max hidden md:block w-64'>
      {/* Search */}
      <Input 
      type='text' 
      value={search}
      onChange={(e)=> setSearch(e.target.value)}
      placeholder='Search...' 
      className='bg-white p-2 rounded-md border-gray-400 border-2 w-full'/>

      {/* Category */}
      <h1 className='mt-5 font-semibold text-xl'>Category</h1>
      <div className='flex flex-col gap-2 mt-3'>
        {
          uniqueCategory.map((item, index)=>(
            <div key={index} className='flex items-center gap-2'>
              <input 
                type="radio" 
                name="category"
                checked={category === item} 
                onChange={()=> handleCategoryClick(item)}
              />
              <label>{item}</label>
            </div>
          ))
        }
      </div>

      {/* Brands */}
      <h1 className='mt-5 font-semibold text-xl'>Brand</h1>
      <select 
        className='bg-white w-full p-2 border-gray-200 border-2 rounded-md' 
        value={brand} 
        onChange={handleBrandChange}
      >
        {
          uniqueBrand.map((item, index)=>{
            return <option key={index} value={item}>{item.toUpperCase()}</option>
          })
        }
      </select>

      {/* Price Range */}
      <h1 className='mt-5 font-semibold text-xl mb-3'>Price Range</h1>
      <div className='flex flex-col gap-4'>
        <label className='font-medium'>
          ₹{priceRange[0]} - ₹{priceRange[1]}
        </label>

        {/* Number inputs */}
        <div className='flex gap-2 items-center justify-between'>
          <div className='flex items-center gap-1'>
            <label className='text-sm'>Min:</label>
            <input 
              type="number" 
              min="0" 
              max="5000" 
              value={priceRange[0]}
              onChange={handleMinChange}
              className='w-20 p-1 border border-gray-300 rounded' 
            />
          </div>
          <span className='text-gray-400'>-</span>
          <div className='flex items-center gap-1'>
            <label className='text-sm'>Max:</label>
            <input 
              type="number"
              min="0" 
              max="5000"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className='w-20 p-1 border border-gray-300 rounded' 
            />
          </div>
        </div>

        {/* Range sliders */}
        <div className='flex flex-col gap-3'>
          <div>
            <label className='text-sm font-medium block mb-2'>Minimum Price</label>
            <input 
              type="range" 
              min="0" 
              max="5000"
              step="100" 
              value={priceRange[0]}
              onChange={handleMinChange}
              className='w-full cursor-pointer'
            />
          </div>

          <div>
            <label className='text-sm font-medium block mb-2'>Maximum Price</label>
            <input 
              type="range" 
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={handleMaxChange}
              className='w-full cursor-pointer'
            />
          </div>
        </div>
      </div>

      {/* Reset button */}
      <Button 
        onClick={handleResetFilters}
        className='bg-pink-600 text-white mt-5 cursor-pointer w-full hover:bg-pink-700'
      >
        Reset Filters
      </Button>

    </div>
  )
}

export default FilterSideBar
