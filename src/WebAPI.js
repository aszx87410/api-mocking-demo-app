const API_ENDPOINT = "http://localhost:8080";

export const login = (payload) =>
  fetch(`${API_ENDPOINT}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const getMe = (payload) => fetch(`${API_ENDPOINT}/me`);
