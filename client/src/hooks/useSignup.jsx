import { axiosInstance } from "../services/api-client.js";
import { useState } from "react";

const useSignup = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSignedup, setSignedup] = useState(false);

  const signup = async (values) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      await axiosInstance.post("/auth/signup", values, {
        withCredentials: true,
      });
      setSignedup(true);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isError,
    submitting,
    isSignedup,
    signup,
  };
};

export default useSignup;
