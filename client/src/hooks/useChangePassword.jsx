import { useState } from "react";
import { axiosAuthInstance } from "../services/api-client";

const useChangePassword = () => {
  const [isError, setIsError] = useState(null);
  const [submitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const changePassword = async (values) => {
    setIsError(null);
    setIsSubmitting(true);

    try {
      const response = await axiosAuthInstance.put(
        "users/change-password",
        values
      );
      setSubmitted(true);
    } catch (error) {
      setIsError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isError, submitting, submitted, changePassword };
};

export default useChangePassword;
