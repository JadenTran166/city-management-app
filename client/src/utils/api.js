import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;

// Authentication
export const login = (credentials) =>
  apiClient.post("/auth/login", credentials);
export const register = (userData) =>
  apiClient.post("/auth/register", userData);
export const getUserProfile = () => apiClient.get("/auth/profile");

// Water Data
export const fetchWaterData = () => apiClient.get("/water");
export const createWaterData = (data) => apiClient.post("/water", data);
export const updateWaterData = (id, data) =>
  apiClient.put(`/water/${id}`, data);
export const deleteWaterData = (id) => apiClient.delete(`/water/${id}`);

// Electricity Data
export const fetchElectricityData = () => apiClient.get("/electricity");
export const uploadElectricityData = (formData) => {
  return apiClient.post("/electricity/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const deleteElectricityData = (id) =>
  apiClient.delete(`/electricity/${id}`);

// Waste Data
export const fetchWasteData = () => apiClient.get("/waste");
export const createWasteData = (data) => apiClient.post("/waste", data);
export const updateWasteData = (id, data) =>
  apiClient.put(`/waste/${id}`, data);
export const deleteWasteData = (id) => apiClient.delete(`/waste/${id}`);
