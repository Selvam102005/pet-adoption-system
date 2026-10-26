import apiClient, { withToken } from "./client";

export const createAdoption = (payload, token) =>
  apiClient.post("/adopts", payload, withToken(token));
export const getAdoptions = (token) => apiClient.get("/adopts", withToken(token));
export const deleteAdoption = (id, token) => apiClient.delete(`/adopts/${id}`, withToken(token));
export const getAdoptionCount = (token) => apiClient.get("/adopts/count", withToken(token));
