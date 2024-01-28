import axios from "axios";
import { axiosAuthInstance } from "../services/api-client.js";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const useLogin = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);

  const { userDetails, updateUserDetails } = useUserContext();

  const login = async (values) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await axios.post(`/api/v1/auth/login`, values, {
        withCredentials: true,
      });
      axiosAuthInstance.defaults.headers.common[
        "authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
      updateUserDetails(response.data.data.user);
    } catch (error) {
      setIsError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isError,
    submitting,
    login,
  };
};

export default useLogin;
