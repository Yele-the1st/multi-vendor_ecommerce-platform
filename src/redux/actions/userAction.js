import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstanceGet,
  axiosInstanceJsonDataWithCredentials,
  axiosInstanceFormDataWithCredentials,
} from "../../utils/axiosInstance";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }) => {
    try {
      const response = await axiosInstanceJsonDataWithCredentials.post(
        "/users/login-user",
        { email, password } // Shorthand object notation
      );

      return response.data.user; // Assuming the response contains the user data or token
    } catch (error) {
      console.log(error);
      throw error.response.data.message; // Rethrow the error to be handled by the calling code
    }
  }
);

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const response = await axiosInstanceGet.get(
      `/users/get-user?cache=${Math.random()}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    console.log(response.data.user);
    return response.data.user;
  } catch (error) {
    console.log(error.response.data.message);
    throw error.response.data.message;
  }
});

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const response = await axiosInstanceGet.get("/users/logout-user");
    return response.data.user;
  } catch (error) {
    console.error(error.response.data.message);
    throw error.response.data.message;
  }
});

export const updateUserInfo = createAsyncThunk(
  "user/updateUserInfo",
  async (newForm) => {
    try {
      const response = await axiosInstanceJsonDataWithCredentials.put(
        "/users/update-user-info",
        newForm
      );
      return response.data.user;
    } catch (error) {
      console.error(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ country, state, city, streetAddress, zipCode, addressType }) => {
    try {
      const response = await axiosInstanceJsonDataWithCredentials.put(
        "/users/update-user-addresses",
        {
          country,
          state,
          city,
          streetAddress,
          zipCode,
          addressType,
        }
      );
      return response.data.user;
    } catch (error) {
      console.error(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const deleteUserAddress = createAsyncThunk(
  "user/deleteUserAddress",
  async (id) => {
    try {
      const response = await axiosInstanceJsonDataWithCredentials.delete(
        `/users/delete-user-address/${id}`
      );
      return response.data.user;
    } catch (error) {
      console.error(error.response.data.message);
      throw error.response.data.message;
    }
  }
);
