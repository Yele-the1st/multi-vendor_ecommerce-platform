import { configureStore } from "@reduxjs/toolkit";
import sellerSlice from "./slices/sellerSlice";
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    seller: sellerSlice,
  },
});

export default store;
