const API_ENDPOINT = "http://localhost:4000";

export const login = (payload) =>
  fetch(`${API_ENDPOINT}/login`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const getMe = () =>
  fetch(`${API_ENDPOINT}/me`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }).then((res) => res.json());
