import axios from "axios";

const api = axios.create({
  baseURL: "https://placement-portal-x5j7.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log("Unauthorized");
          break;

        case 403:
          console.log("Access Denied");
          break;

        case 404:
          console.log("API Not Found");
          break;

        case 500:
          console.log("Internal Server Error");
          break;

        default:
          console.log(error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default api;