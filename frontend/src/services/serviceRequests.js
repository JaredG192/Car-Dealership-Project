// src/services/requestService.js

export const getRequests = () => {
  return JSON.parse(localStorage.getItem("requests")) || [];
};

export const addRequest = (request) => {
  const existing = JSON.parse(localStorage.getItem("requests")) || [];

  const newRequest = {
    id: Date.now(),
    created_at: new Date().toISOString(),
    ...request
  };

  localStorage.setItem("requests", JSON.stringify([...existing, newRequest]));
};

export const deleteRequest = (id) => {
  const existing = JSON.parse(localStorage.getItem("requests")) || [];

  const updated = existing.filter((r) => r.id !== id);

  localStorage.setItem("requests", JSON.stringify(updated));
};