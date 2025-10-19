import { post } from "../fetch.api";

export const signIn = async (email: string, password: string) => {
  const response = await post("/auth/signin", { email, password });

  console.log("Login response:", response);
  return response;
};
