import { createSlice } from "@reduxjs/toolkit";
import { loadUser } from "../actions/userAction";

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
      });
  },
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
