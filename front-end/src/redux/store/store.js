import { configureStore } from "@reduxjs/toolkit";
import userLoged from "../slices/userLogedSlice";
import cart from "../slices/cartSlice";

export default configureStore({
  reducer: {
    userLoged,
    cart,
  },
});
