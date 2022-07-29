import React, { useState, useMemo, createContext } from "react";

export const UserContext = createContext();

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(false)

  const value = useMemo(() => ({ user, setUser, admin, setAdmin }), [user, admin]);

  return (
    <UserContext.Provider value={{ user, setUser, admin, setAdmin }}>{props.children}</UserContext.Provider>
  );
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
}