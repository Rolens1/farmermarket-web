const API_BASE_URL = "http://localhost:3001";

export const post = async (url: string, data: unknown) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
