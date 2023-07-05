import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishList: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToWishList: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishList.find((i) => i._id === item._id);
      if (isItemExist) {
        state.wishList = state.wishListSlice.map((i) =>
          i._id === isItemExist._id ? item : i
        );
      } else {
        state.wishList.push(item);
      }
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    },
    removeFromWishList: (state, action) => {
      state.wishList = state.wishList.filter(
        (i) => i._id !== action.payload._id
      );
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
