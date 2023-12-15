import { useState } from "react";
import axios from "axios";
const useSignup = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSignedup, setIsSignedup] = useState(false);

  const signup = async (values) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        values
      );
      setIsSignedup(true);
    } catch (error) {
      setIsError(error.response.data.message);
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
