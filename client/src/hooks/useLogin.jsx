import { axiosInstance } from "../services/api-client.js";
import axios from "axios";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const useLogin = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loggedin, setLoggedin] = useState(false);

  const { updateUserDetails } = useUserContext();

  const login = async (values) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await axiosInstance.post("/auth/login", values, {
        withCredentials: true,
      });
      console.log(response);
      updateUserDetails(response.data.data);
      setLoggedin(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isError,
    submitting,
    loggedin,
    login,
  };
};

export default useLogin;
