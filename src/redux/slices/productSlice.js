import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  loadShopProducts,
  deleteProduct,
  loadProduct,
  loadBestSellingProduct,
  loadAllProduct,
  loadLatestProduct,
} from "../actions/productAction";
import { toast } from "react-toastify";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    shopProducts: null,
    loading: false,
    success: false,
    error: null,
    message: null,
    singleProduct: null,
    allProducts: null,
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
      .addCase(createProduct.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.success = true;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(createProduct.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      //get all shop Products

      .addCase(loadShopProducts.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadShopProducts.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.shopProducts = action.payload;
        state.error = null;
      })
      .addCase(loadShopProducts.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      //get single Product

      .addCase(loadProduct.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadProduct.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.singleProduct = action.payload;
        state.error = null;
      })
      .addCase(loadProduct.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      //Delete shop Products

      .addCase(deleteProduct.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      //Load best selling Products

      .addCase(loadBestSellingProduct.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadBestSellingProduct.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.BestSelling = action.payload;
      })
      .addCase(loadBestSellingProduct.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loadAllProduct.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadAllProduct.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(loadAllProduct.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(loadLatestProduct.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadLatestProduct.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.latestProducts = action.payload;
      })
      .addCase(loadLatestProduct.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, resetSuccess } = productSlice.actions;
export default productSlice.reducer;
