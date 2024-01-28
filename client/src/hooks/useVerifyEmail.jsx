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

  const { userDetails, updateUserDetails } = useUserContext();
  useEffect(() => {
    if (!token || userDetails) {
      return navigate("/");
    }
    const verifyEmail = async () => {
      setIsSubmitting(true);
      setIsError(null);
      try {
        const response = await axios.get(
          `/api/v1/auth/verify-email?token=${token}`,
          {
            withCredentials: true,
          }
        );
        axiosAuthInstance.defaults.headers.common[
          "authorization"
        ] = `Bearer ${response.data.data.accessToken}`;
        updateUserDetails(response.data.data.existingUser);
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
