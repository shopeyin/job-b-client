"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
  });

  // Load user and token from localStorage when the app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      setAuthState({
        user: JSON.parse(savedUser),
        token: savedToken,
      });
    }
  }, []);


  const login = (user, token) => {
    setAuthState({ user, token });

   
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };


  const logout = () => {
    setAuthState({ user: null, token: null });

    
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}
