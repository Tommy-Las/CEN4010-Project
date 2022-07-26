import React, { useState, useMemo, createContext } from "react";

export const AdminContext = createContext();

export function AdminContextProvider(props) {
  const [admin, setAdmin] = useState(null);

  const value = useMemo(() => ({ admin, setAdmin }), [admin]);

  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
}

export function useAdminContext() {
  const context = React.useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminContext must be used within a AdminContextProvider");
  }
  return context;
}