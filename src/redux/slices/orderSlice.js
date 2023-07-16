import { createSlice } from "@reduxjs/toolkit";
import { getUserOrders } from "../actions/orderAction.js";

const orderSlice = createSlice({
  name: "event",
  initialState: {
    orders: null,
    userOrders: null,
    loading: false,
    success: false,
    error: null,
    message: null,
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
      // .addCase(createEvent.pending, (state) => {
      //   // Handle pending state if needed
      //   state.loading = true;
      // })
      // .addCase(createEvent.fulfilled, (state, action) => {
      //   // Handle successful creation
      //   // Update state with the received data
      //   state.loading = false;
      //   state.success = true;
      //   state.event = action.payload;
      //   state.error = null;
      // })
      // .addCase(createEvent.rejected, (state, action) => {
      //   // Handle login failure
      //   // Update state or show error message
      //   state.loading = false;
      //   state.error = action.error.message;
      //   state.success = false;
      // })

      //get all orders of a User

      .addCase(getUserOrders.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.userOrders = action.payload;
        state.error = null;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, resetSuccess } = orderSlice.actions;
export default orderSlice.reducer;
