import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstanceGet,
  axiosInstanceFormData,
  axiosInstanceJsonDataWithCredentials,
} from "../../utils/axiosInstance";

export const loadShopEvents = createAsyncThunk(
  "events/loadShopEvents",
  async (id) => {
    try {
      const response = await axiosInstanceGet.get(
        `/events/get-all-shop-events/${id}`
      );
      return response.data.products;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (newForm) => {
    try {
      const response = await axiosInstanceFormData.post(
        "/events/create-event",
        newForm // Shorthand object notation
      );
      return response.data.event; // Assuming the response contains the user data or token
    } catch (error) {
      throw error.response.data.errorMessage; // Rethrow the error to be handled by the calling code
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id) => {
    try {
      const response = await axiosInstanceGet.delete(
        `/events/delete-shop-events/${id}`
        // Shorthand object notation
      );
      return response.data.message; // Assuming the response contains the user data or token
    } catch (error) {
      throw error.response.data.message; // Rethrow the error to be handled by the calling code
    }
  }
);
