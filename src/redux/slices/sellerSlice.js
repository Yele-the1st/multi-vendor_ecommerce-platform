import { createSlice } from "@reduxjs/toolkit";
import { loadSeller, logoutSeller, loginSeller } from "../actions/sellerAction";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    sellerIsAuthenticated:
      localStorage.getItem("sellerIsAuthenticated") === "true",
    loading: true,
    seller: localStorage.getItem("seller")
      ? JSON.parse(localStorage.getItem("seller"))
      : null,
    error: "null",
    fetchedLoading: false,
    fetchedSeller: "",
    fetchedError: "",
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginSeller.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        // Handle successful login
        // Update state with the received user data or token
        state.loading = false;
        state.sellerIsAuthenticated = true;
        state.seller = action.payload;
        state.error = null;

        localStorage.setItem("sellerIsAuthenticated", true);
        localStorage.setItem("seller", JSON.stringify(action.payload));
      })
      .addCase(loginSeller.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
        state.sellerIsAuthenticated = false;
        state.seller = [];
      })

      .addCase(loadSeller.pending, (state) => {
        state.fetchedLoading = true;
      })
      .addCase(loadSeller.fulfilled, (state, action) => {
        state.fetchedLoading = false;
        state.fetchedSeller = action.payload;
        state.fetchedError = "";
      })
      .addCase(loadSeller.rejected, (state, action) => {
        state.fetchedLoading = false;
        state.fetchedError = action.error.message;
        state.fetchedSeller = "";
      })

      .addCase(logoutSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.sellerIsAuthenticated = false;
        state.seller = [];
        state.error = null;

        // Save authentication data in local storage
        localStorage.setItem("sellerIsAuthenticated", false);
        localStorage.setItem("seller", JSON.stringify([]));
      });
  },
});

export const { clearErrors } = sellerSlice.actions;
export default sellerSlice.reducer;
