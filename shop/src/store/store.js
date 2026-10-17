import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { writeStoredValue } from "../utils/storage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  writeStoredValue("cart", store.getState().cart.items);
});
