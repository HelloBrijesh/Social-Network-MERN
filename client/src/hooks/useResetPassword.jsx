import axios from "axios";
import { axiosAuthInstance } from "../services/api-client.js";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useResetPassword = (token) => {
  let navigate = useNavigate();
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const { userDetails, updateUserDetails } = useUserContext();

  useEffect(() => {
    if (!token || userDetails) {
      return navigate("/");
    }
  }, []);

  const resetPassword = async (password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/reset-password?token=${token}`,
        { password: password },
        {
          withCredentials: true,
        }
      );
      axiosAuthInstance.defaults.headers.common[
        "authorization"
      ] = `Bearer ${response.data.data.accessToken}`;
      updateUserDetails(response.data.data.existingUser);
      setSubmitted(true);
    } catch (error) {
      setIsError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isError,
    submitting,
    submitted,
    resetPassword,
  };
};

export default useResetPassword;
