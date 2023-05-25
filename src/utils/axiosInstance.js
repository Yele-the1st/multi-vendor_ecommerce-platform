import axios from "axios";

export const axiosInstanceFormData = axios.create({
  baseURL: "http://localhost:6600/api/",
  headers: {
    "Content-Type": "multipart/form-data", // Set the default content type
    // Add any other headers you require
  },
});

export const axiosInstanceJsonData = axios.create({
  baseURL: "http://localhost:6600/api/",
  headers: {
    "Content-Type": "application/json", // Set the default content type to JSON
    // Add any other headers you require
  },
});
export const axiosInstanceJsonDataWithCredentials = axios.create({
  baseURL: "http://localhost:6600/api/",
  headers: {
    "Content-Type": "application/json", // Set the default content type to JSON
    // Add any other headers you require
  },
  withCredentials: true,
});
