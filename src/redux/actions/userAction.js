import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstanceGet } from "../../utils/axiosInstance";

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const response = await axiosInstanceGet.get("/users/get-user");
    return response.data.user;
  } catch (error) {
    throw error.response.data.message;
  }
});
