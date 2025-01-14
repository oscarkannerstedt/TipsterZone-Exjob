import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContextTs";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedUserId && storedIsLoggedIn) {
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedUserId = localStorage.getItem("userId");

      if (storedUserId && storedIsLoggedIn) {
        setUserId(storedUserId);
        setIsLoggedIn(true);
      } else {
        setUserId(null);
        setIsLoggedIn(false);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
