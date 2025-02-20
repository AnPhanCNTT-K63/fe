import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found in localStorage or sessionStorage");
    }
    console.log("Authorization header:", config.headers["Authorization"]);
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
