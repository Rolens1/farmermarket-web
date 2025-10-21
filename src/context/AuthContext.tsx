import React, { createContext, useContext, useEffect, useState } from "react";
import { securedGet } from "../app/api/fetch.api";

export type AuthUser = {
  id: string;
  email: string;
  // Add any other user fields you need
} | null;

interface AuthContextType {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);

  useEffect(() => {
    // On mount, try to fetch user info if accessToken exists
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setUser(null);
      return;
    }
    // Fetch user info from API
    const fetchUser = async () => {
      try {
        const response = await securedGet("/auth/me");
        if (response && response.user) {
          setUser(response.user);
        } else {
          setUser(null);
        }
      } catch (e) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  // No need to persist user to localStorage, always fetch from API

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
