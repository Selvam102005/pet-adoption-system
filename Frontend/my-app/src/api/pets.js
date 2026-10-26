import apiClient, { withToken } from "./client";

export const getPets = () => apiClient.get("/petdata");
export const createPet = (payload, token) => apiClient.post("/pets", payload, withToken(token));
export const updatePet = (id, payload, token) =>
  apiClient.put(`/pets/update/${id}`, payload, withToken(token));
export const deletePet = (id, token) => apiClient.delete(`/pets/delete/${id}`, withToken(token));
export const getPetCount = (token) => apiClient.get("/pets/count", withToken(token));
