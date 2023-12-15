import axios from "axios";
import { axiosAuthInstance } from "../services/api-client.js";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const useVerifyEmail = (token) => {
  let navigate = useNavigate();
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const { loginStatus, updateLoginStatus } = useUserContext();
  useEffect(() => {
    if (!token || loginStatus) {
      return navigate("/");
    }
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/auth/verify-email?token=${token}`,
          {
            withCredentials: true,
          }
        );
        axiosAuthInstance.defaults.headers.common[
          "authorization"
        ] = `Bearer ${response.data.data.accessToken}`;
        updateLoginStatus(true);
        setIsVerified(true);
      } catch (error) {
        setIsError(error.response.data.message);
      } finally {
        setIsSubmitting(false);
      }
    };

    verifyEmail();
  }, []);

  return {
    isError,
    submitting,
    isVerified,
  };
};

export default useVerifyEmail;
