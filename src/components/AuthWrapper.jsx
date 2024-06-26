import React, { useContext, useEffect, useState } from "react";
import { isLocalStorageSet } from "../../services/ClientHelpers";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { AppContext } from "../Context";

const AuthWrapper = ({ children }) => {
  const {authData , setAuthData} = useContext(AppContext)
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const { setRole } = useContext(AppContext);
  useEffect(() => {
    const isToken = isLocalStorageSet("token");
    const isRole = isLocalStorageSet("role");
    const isEmail = isLocalStorageSet("email");
    if (!isToken || !isRole || !isEmail) {
      navigate("/");
    }
    authData.email = localStorage.getItem('email')
    authData.role = localStorage.getItem('role')
    setAuthData(authData)
    setLoading(false);
    setRole(localStorage.getItem("role"));
  }, []);
  return isLoading ? (
    <div className="h-[100dvh] flex items-center justify-center">
      <div className="text-xl font-semibold p-5 border shadow-md rounded-lg">
        Loading .....
      </div>
    </div>
  ) : (
    <>
      {" "}
      <Nav /> {children}
    </>
  );
};

export default AuthWrapper;
