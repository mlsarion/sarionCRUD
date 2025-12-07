const API_BASE = "https://marksarion.onrender.com";

export async function fetchWithToken(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token"); // or however you store it

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}
