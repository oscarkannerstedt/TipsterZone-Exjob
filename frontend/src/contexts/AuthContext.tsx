import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextTs";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const savedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (savedIsLoggedIn === "true" && savedUserId) {
      setIsLoggedIn(true);
      setUserId(savedUserId);
    }
  }, []);

  const login = (id: string) => {
    setIsLoggedIn(true);
    setUserId(id);

    localStorage.setItem("userId", id);
    localStorage.setItem("isLoggedIn", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);

    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
