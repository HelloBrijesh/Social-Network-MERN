// contexts/UserContext.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    return storedUserDetails ? JSON.parse(storedUserDetails) : null;
  });
  const [loginStatus, setLoginStatus] = useState(() => {
    const storedLoginStatus = localStorage.getItem("loginStatus");
    return storedLoginStatus ? JSON.parse(storedLoginStatus) : false;
  });

  const updateUserDetails = useCallback((newUserDetails) => {
    setUserDetails(newUserDetails);
    localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
  }, []);
  const updateLoginStatus = useCallback((newLoginStatus) => {
    setLoginStatus(newLoginStatus);
    localStorage.setItem("loginStatus", JSON.stringify(newLoginStatus));
  }, []);

  const contextValue = {
    loginStatus,
    updateLoginStatus,
    userDetails,
    updateUserDetails,
  };

  useEffect(() => {
    localStorage.setItem("loginStatus", JSON.stringify(loginStatus));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [loginStatus, userDetails]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useUserContext };
