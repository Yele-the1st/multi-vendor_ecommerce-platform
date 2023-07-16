import { createSlice } from "@reduxjs/toolkit";
import {
  loadUser,
  logoutUser,
  loginUser,
  updateUserInfo,
  updateUserAddress,
  deleteUserAddress,
} from "../actions/userAction";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: localStorage.getItem("isAuthenticated"),
    loading: false,
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Handle successful login
        // Update state with the received user data or token
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;

        // Save authentication data in local storage
        toast.success("Successfully Logged in");
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        toast.error(action.error.message);
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.user = [];
      })
      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;

        // Save authentication data in local storage
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
        state.user = [];

        // Revoke authentication data in local storage
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = [];
        state.error = null;

        // Save authentication data in local storage
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
      })
      .addCase(updateUserInfo.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        // Handle successful login
        // Update state with the received user data or token
        state.loading = false;
        state.user = action.payload;

        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUserAddress.pending, (state) => {
        // Handle pending state if needed
        state.addyLoading = true;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        // Handle successful login
        // Update state with the received user data or token
        state.addyLoading = false;
        state.user = action.payload;

        toast.success("Successfully added Address");
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.addyLoading = false;

        toast.error(action.error.message);
      })
      .addCase(deleteUserAddress.pending, (state) => {
        // Handle pending state if needed
        state.addyLoading = true;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        // Handle successful login
        // Update state with the received user data or token
        state.addyLoading = false;
        state.user = action.payload;

        toast.success("Successfully deleted Address");
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.addyLoading = false;

        toast.error(action.error.message);
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
