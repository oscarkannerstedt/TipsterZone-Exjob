import React, { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = (id: string) => {
    setIsLoggedIn(true);
    setUserId(id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
