import { createSlice } from "@reduxjs/toolkit";
import {
  createEvent,
  loadShopEvents,
  deleteEvent,
} from "../actions/eventAction.js";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    event: null,
    shopEvents: null,
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
      .addCase(createEvent.pending, (state) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.success = true;
        state.event = action.payload;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
        state.success = false;
      })

      //get all shop Events

      .addCase(loadShopEvents.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(loadShopEvents.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.shopEvents = action.payload;
        state.error = null;
      })
      .addCase(loadShopEvents.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      })

      //Delete shop Events

      .addCase(deleteEvent.pending, (state, action) => {
        // Handle pending state if needed
        state.loading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        // Handle successful creation
        // Update state with the received data
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        // Handle login failure
        // Update state or show error message
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearErrors, resetSuccess } = eventSlice.actions;
export default eventSlice.reducer;
