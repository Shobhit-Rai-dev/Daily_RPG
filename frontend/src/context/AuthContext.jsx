import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, getToken } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (token) {
        try {
          const data = await authAPI.getMe();
          if (data && data.user) {
            setUser(data.user);
          } else {
            setUser(null);
            setToken(null);
          }
        } catch {
          // If token verification fails, reset
          setUser(null);
          setToken(null);
        }
      } else {
        // Unauthenticated users land on login page
        setUser(null);
      }
      setIsLoading(false);
    }
    initAuth();
  }, [token]);

  async function login(email, password) {
    setIsLoading(true);
    try {
      const data = await authAPI.login(email, password);
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }

  async function register(username, email, password, gender = "male") {
    setIsLoading(true);
    try {
      const data = await authAPI.register(username, email, password, gender);
      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    authAPI.logout();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
