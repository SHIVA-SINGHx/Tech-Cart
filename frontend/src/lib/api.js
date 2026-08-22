import axios from "axios";

// Default to local backend port 8082 if VITE_API_URL is not set
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8082";

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default API_URL;
