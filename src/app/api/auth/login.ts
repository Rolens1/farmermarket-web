import { deleteCookie, setCookie } from "../cookie/cookie";
import { post } from "../fetch.api";

export const signIn = async (email: string, password: string) => {
  const response = await post("/auth/signin", { email, password });

  console.log("Login response:", response);

  localStorage.setItem("refreshToken", response.refreshToken);
  localStorage.setItem("accessToken", response.accessToken);
  return response;
};

export const signUp = async (email: string, password: string) => {
  const response = await post("/auth/signup", { email, password });

  console.log("Signup response:", response);

  localStorage.setItem("refreshToken", response.refreshToken);
  localStorage.setItem("accessToken", response.accessToken);
  return response;
};

export const signOut = async () => {
  //   const response = await post("/auth/signout", {});
  //   console.log("Signout response:", response);
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  //   return response;
};
export const refreshToken = async (refreshToken: string) => {
  const response = await post("/auth/refresh", { refreshToken });

  console.log("Refresh token response:", response);
  localStorage.setItem("accessToken", response.accessToken);
  return response;
};

export const fetchMe = async (accessToken: string) => {
  const response = await post("/auth/me", { accessToken });
  console.log("Fetch me response:", response);
  return response;
};
