import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./slices/sellerSlice";
import userSlice from "./slices/userSlice";
import productSlice from "./slices/productSlice";
import eventSlice from "./slices/eventSlice";
import couponSlice from "./slices/couponSlice";
import cartSlice from "./slices/cartSlice";
import wishListSlice from "./slices/wishListSlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    seller: sellerSlice,
    product: productSlice,
    event: eventSlice,
    coupon: couponSlice,
    cart: cartSlice,
    wishList: wishListSlice,
    order: orderSlice,
  },
});

export default store;
