import axios from "axios";
import { axiosAuthInstance } from "../services/api-client.js";
import { useState } from "react";
import { useUserContext } from "../context/UserContext";

const useEditProfile = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);

  const { updateUserDetails } = useUserContext();

  const editProfile = async (values) => {
    setIsSubmitting(true);
    setIsError(false);

    try {
      const response = await axiosAuthInstance.put(
        `${import.meta.env.VITE_SERVER_URL}/users`,
        values
      );
      updateUserDetails(response.data.data);
    } catch (error) {
      setIsError(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isError,
    submitting,
    editProfile,
  };
};

export default useEditProfile;
