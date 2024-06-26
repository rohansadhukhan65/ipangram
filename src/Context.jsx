// AppContext.js
import React, { createContext, useState } from "react";

// Create a context object
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [emp, setEmp] = useState([]);
  const [authDetails, setAuthDetails] = useState({
    role: null,
    email: null,
  });
  const data = {
    role: role,
    setRole: (Datarole) => setRole(Datarole),
    emp: emp,
    setEmp: (dataEmp) => setEmp(dataEmp),
    authData: authDetails,
    setAuthData: (data) => setAuthDetails(data),
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};
