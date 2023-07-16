import axios from "axios";

export const axiosInstanceFormData = axios.create({
  baseURL: "http://localhost:6600/api/",
  headers: {
    "Content-Type": "multipart/form-data", // Set the default content type
    // Add any other headers you require
  },
});

export const axiosInstanceFormDataWithCredentials = axios.create({
  baseURL: "http://localhost:6600/api/",
  headers: {
    "Content-Type": "multipart/form-data", // Set the default content type
    // Add any other headers you require
  },
  withCredentials: true,
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

export const axiosInstanceGet = axios.create({
  baseURL: "http://localhost:6600/api/",
  withCredentials: true,
});

export const backend_url = "http://localhost:6600/uploads/";

// // Function to set an item in localStorage with an expiry date
// function setItemWithExpiry(key, value, expiryInMinutes) {
//   const now = new Date();
//   const expiryDate = new Date(now.getTime() + expiryInMinutes * 60000); // Convert minutes to milliseconds

//   const item = {
//     value: value,
//     expiry: expiryDate.getTime() // Store expiry date as a timestamp
//   };

//   localStorage.setItem(key, JSON.stringify(item));
// }

// // Function to retrieve an item from localStorage and check if it has expired
// function getItemWithExpiry(key) {
//   const item = JSON.parse(localStorage.getItem(key));

//   if (!item) {
//     return null; // Item doesn't exist
//   }

//   const now = new Date().getTime();

//   if (now > item.expiry) {
//     localStorage.removeItem(key); // Item has expired, remove it from localStorage
//     return null;
//   }

//   return item.value;
// }

// // // Example usage
// // setItemWithExpiry('myKey', 'myValue', 60); // Set item with expiry of 60 minutes
// // const retrievedValue = getItemWithExpiry('myKey');
// // console.log(retrievedValue); // Output: 'myValue' (if retrieved within 60 minutes)
