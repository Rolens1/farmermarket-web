import { post, securedGet } from "../fetch.api";

export const signIn = async (email: string, password: string) => {
  const response = await post("/auth/signin", { email, password });

  // Only store tokens if login was successful
  if (response?.accessToken) {
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken ?? "");
  }

  return response;
};

export const signUp = async (email: string, password: string) => {
  const response = await post("/auth/signup", { email, password });

  // Supabase signup doesn't return a session until email is confirmed
  // so we do NOT store tokens here
  return response;
};

export const signOut = async () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
};

export const refreshToken = async (token: string) => {
  const response = await post("/auth/refresh", { refreshToken: token });
  if (response?.accessToken) {
    localStorage.setItem("accessToken", response.accessToken);
  }
  return response;
};

export const fetchMe = async () => {
  return await securedGet("/auth/me");
};
