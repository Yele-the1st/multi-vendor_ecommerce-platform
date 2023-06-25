import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstanceGet,
  axiosInstanceJsonDataWithCredentials,
} from "../../utils/axiosInstance";

export const loginSeller = createAsyncThunk(
  "shop/loginSeller",
  async ({ email, password }) => {
    try {
      const response = await axiosInstanceJsonDataWithCredentials.post(
        "/shops/login-shop",
        { email, password } // Shorthand object notation
      );

      return response.data.seller; // Assuming the response contains the user data or token
    } catch (error) {
      console.log(error);
      throw error.response.data.message; // Rethrow the error to be handled by the calling code
    }
  }
);

export const loadSeller = createAsyncThunk("shop/loadSeller", async (id) => {
  try {
    const response = await axiosInstanceGet.get(`/shops/get-shop/${id}`);
    console.log(`newwsettt4455${response.data.seller}`);
    console.log(response);
    return response.data.seller;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
});

export const logoutSeller = createAsyncThunk("shop/logoutSeller", async () => {
  try {
    const response = await axiosInstanceGet.get("/shops/logout-shop");
    return response.data.seller;
  } catch (error) {
    console.error(error.response.data.message);
    throw error.response.data.message;
  }
});
