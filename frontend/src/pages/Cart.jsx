import { Card } from '@/components/ui/card';
import React from 'react'
import { useSelector } from 'react-redux';

const Cart = () => {
  const cart = useSelector(store => store.product)
  console.log(cart);
  
  return (
    <div className='pt-20 bg-gray-50 min-h-screen'>
      {
        cart?.products?.length > 0 ? <div>
          <h1 className='text-2xl font-bold text-gray-800 mb-7 '>Shopping Cart</h1>
          <div className='max-w-7xl mx-auto flex gap-7'>
            <div className=' flex flex-col gap-5 flex-1'>
              {
                cart.products.map((product, index)=>{
                  return <Card key={index}>
                    <div className='flex justify-between items-center pr-7'>
                      <div className=' flex items-center w-[350px]'>
                        <img src={product?.productImg?.[0]?.url || "noting" } alt="" />
                      </div>
                      <h2>
                        {product.productName}
                      </h2>
                    </div>
                  </Card>
                })
              }

            </div>
          </div>
          
        </div> : <div>Your cart is empty</div>
      }
      
    </div>
  )
}

export default Cart

