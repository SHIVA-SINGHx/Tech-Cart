import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: []
    },
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload;
        },
        addToCart: (state, action) => {
            state.cartItems = action.payload;
        },
        removeFromCart: (state, action) => {
            state.cartItems = action.payload;
        }
    }
});

export const { setCart, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
