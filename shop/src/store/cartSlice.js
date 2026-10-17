import { createSlice } from "@reduxjs/toolkit";
import { readStoredValue } from "../utils/storage";

const storedCart = readStoredValue("cart", []);
const savedCart = Array.isArray(storedCart)
  ? storedCart.filter(
      (item) =>
        item &&
        Number.isInteger(item.id) &&
        typeof item.title === "string" &&
        Number.isFinite(item.price) &&
        typeof item.thumbnail === "string" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    )
  : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: savedCart },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (!product || !Number.isInteger(product.id)) return;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    clearCart(state) {
      state.items = [];
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
