import { createSlice } from "@reduxjs/toolkit";
import { loadUser, logoutUser, loginUser } from "../actions/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
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
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
