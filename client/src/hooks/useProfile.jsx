import { axiosAuthInstance } from "../services/api-client";
import { useState, useEffect } from "react";
const useProfile = (userId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [profileDetails, setProfileDetails] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axiosAuthInstance
      .get(`/users/${userId}/profile-details`)
      .then((response) => {
        setProfileDetails(response.data.data);
        setFriends(response.data.data.friends);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId, showEditProfile]);

  return {
    isLoading,
    isError,
    friends,
    profileDetails,
    posts,
    showEditProfile,
    setShowEditProfile,
  };
};

export default useProfile;
