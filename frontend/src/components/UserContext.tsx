import { createContext, useContext, useState } from "react";

export type User = {
  email: string;
  role: "STUDENT" | "ADMIN" | "PROFESSOR" | "ASSISTANT";
};
type UserContextType = {
  user: User | null;
  login: (
    email: string,
    password: string,
    studentFlag: boolean
  ) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (
    email: string,
    password: string,
    studentFlag: boolean
  ) => {
    const loginData = { email: email, password: password };
    const userType = studentFlag ? "student" : "teacher";
    await fetch(`${process.env.REACT_APP_BE_URL}/auth/${userType}/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        if (response.ok) {
          alert(`Hello user`);
          //   navigator("/dashboard");
        } else {
          response.json().then((data) => {
            alert(data.error);
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const logout = () => {
    setUser(null);
  };

  const contextValue: UserContextType = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
