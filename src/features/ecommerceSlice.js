import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const ecommerceSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cart.find((p) => p.id === item.id);

      if (existing) {
        existing.quantity += 1; // increase quantity
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      const existing = state.cart.find((p) => p.id === item.id);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          state.cart = state.cart.filter((p) => p.id !== item.id);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    deleteFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },

  },
});

export const { addToCart, removeFromCart, clearCart, deleteFromCart } = ecommerceSlice.actions;
export default ecommerceSlice.reducer;




