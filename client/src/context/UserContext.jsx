// contexts/UserContext.js
import {
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

  const updateUserDetails = useCallback((newUserDetails) => {
    setUserDetails(newUserDetails);
    localStorage.setItem("userDetails", JSON.stringify(newUserDetails));
  }, []);

  const contextValue = {
    userDetails,
    updateUserDetails,
  };

  useEffect(() => {
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }, [userDetails]);

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
