import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstanceGet,
  axiosInstanceFormData,
  axiosInstanceJsonDataWithCredentials,
} from "../../utils/axiosInstance";

export const loadShopCoupons = createAsyncThunk(
  "coupons/loadShopCoupons",
  async (id) => {
    try {
      const response = await axiosInstanceGet.get(
        `/coupons/get-all-shop-coupons/${id}`
      );
      return response.data.coupons;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const createCoupon = createAsyncThunk(
  "Coupons/createCoupon",
  async ({ name, value, maxAmount, minAmount, selectedProduct, shopId }) => {
    try {
      const response = await axiosInstanceJsonDataWithCredentials.post(
        "/coupons/create-coupon",
        { name, value, maxAmount, minAmount, selectedProduct, shopId } // Shorthand object notation
      );
      return response.data.coupon; // Assuming the response contains the user data or token
    } catch (error) {
      throw error.response.data.errorMessage; // Rethrow the error to be handled by the calling code
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id) => {
    try {
      const response = await axiosInstanceGet.delete(
        `/coupons/delete-shop-coupon/${id}`
        // Shorthand object notation
      );
      return response.data.message; // Assuming the response contains the user data or token
    } catch (error) {
      throw error.response.data.message; // Rethrow the error to be handled by the calling code
    }
  }
);
