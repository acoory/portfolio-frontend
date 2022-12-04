import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserConsumer = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, isAuth, setIsAuth }}>
      {children}
    </UserContext.Provider>
  );
};
