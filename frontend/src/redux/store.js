import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./userSlice"
import productSlice from "./productSlice"
import cartSlice from "./cartSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    product: productSlice,
    cart: cartSlice
  },
})