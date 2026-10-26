import apiClient from "./client";

export const registerUser = (payload) => apiClient.post("/users", payload);
export const loginUser = (payload) => apiClient.post("/users/login", payload);
export const registerAdmin = (payload) => apiClient.post("/admin/register", payload);
export const loginAdmin = (payload) => apiClient.post("/admin/login", payload);
