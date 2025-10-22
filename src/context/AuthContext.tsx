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
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // On mount, try to fetch user info if accessToken exists
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setUser(null);
      setIsAuthenticated(false);
      return;
    }
    // Fetch user info from API
    const fetchUser = async () => {
      try {
        const response = await securedGet("/auth/me");
        if (response && response.user) {
          setUser(response.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (e) {
        setUser(null);
        setIsAuthenticated(false);
      }
    };
    fetchUser();
  }, []);

  // No need to persist user to localStorage, always fetch from API

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
