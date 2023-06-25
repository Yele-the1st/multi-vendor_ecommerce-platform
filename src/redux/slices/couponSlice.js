import { createSlice } from "@reduxjs/toolkit";
import {
  createCoupon,
  loadShopCoupons,
  deleteCoupon,
} from "../actions/couponAction.js";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupon: null,
    shopCoupons: null,
    loading: false,
    success: false,
    error: null,
    message: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    resetSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.success = true;
        state.coupon = action.payload;
        state.error = null;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      //get all shop coupons

      .addCase(loadShopCoupons.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadShopCoupons.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.shopCoupons = action.payload;
        state.error = null;
      })
      .addCase(loadShopCoupons.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      //Delete shop coupons

      .addCase(deleteCoupon.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, resetSuccess } = couponSlice.actions;
export default couponSlice.reducer;
