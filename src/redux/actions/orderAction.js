import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstanceGet,
  axiosInstanceFormData,
  axiosInstanceJsonDataWithCredentials,
} from "../../utils/axiosInstance";

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (userId) => {
    try {
      const response = await axiosInstanceGet.get(
        `orders/get-all-orders/${userId}`
      );
      return response.data.orders;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);
