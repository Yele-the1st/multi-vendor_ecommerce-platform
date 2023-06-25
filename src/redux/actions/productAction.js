import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  axiosInstanceGet,
  axiosInstanceFormData,
  axiosInstanceJsonDataWithCredentials,
} from "../../utils/axiosInstance";

export const loadShopProducts = createAsyncThunk(
  "products/loadShopProducts",
  async (id) => {
    try {
      const response = await axiosInstanceGet.get(
        `/products/get-all-shop-products/${id}`
      );
      return response.data.products;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const loadProduct = createAsyncThunk(
  "products/loadProduct",
  async (id) => {
    try {
      const response = await axiosInstanceGet.get(
        `/products/get-product/${id}`
      );
      return response.data.product;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const loadBestSellingProduct = createAsyncThunk(
  "products/loadBestSellingProduct",
  async () => {
    try {
      const response = await axiosInstanceGet.get(`/products/get-bestselling`);
      return response.data.products;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const loadLatestProduct = createAsyncThunk(
  "products/loadLatestProduct",
  async () => {
    try {
      const response = await axiosInstanceGet.get(`/products/get-latestdrops`);
      return response.data.products;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const loadAllProduct = createAsyncThunk(
  "products/loadAllProduct",
  async () => {
    try {
      const response = await axiosInstanceGet.get(`/products/get-all-products`);
      return response.data.products;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await axiosInstanceGet.get(`/products/get-all-products`);
      return response.data.products;
    } catch (error) {
      console.log(error.response.data.message);
      throw error.response.data.message;
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (newForm) => {
    try {
      const response = await axiosInstanceFormData.post(
        "/products/create-product",
        newForm // Shorthand object notation
      );
      return response.data.message; // Assuming the response contains the user data or token
    } catch (error) {
      throw error.response.data.errorMessage; // Rethrow the error to be handled by the calling code
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await axiosInstanceGet.delete(
        `/products/delete-shop-products/${id}`
        // Shorthand object notation
      );
      return response.data.message; // Assuming the response contains the user data or token
    } catch (error) {
      throw error.response.data.message; // Rethrow the error to be handled by the calling code
    }
  }
);
