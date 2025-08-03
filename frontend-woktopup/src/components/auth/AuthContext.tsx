import React, { createContext, useContext, useState, useEffect } from "react";
import axiosTest from "../../plugins/axios";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
};

type User = {
  id: number;
  name: string;
  email: string;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = async () => {
    await axiosTest.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
    localStorage.removeItem("user_id");
  };

  // ⬇️ Auto-fetch user saat aplikasi dimount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosTest.get("/user", {
          withCredentials: true,
        });
        setUser(data);
      } catch (error) {
        setUser(null); // Optional: fallback if token expired
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
