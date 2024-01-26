import { axiosAuthInstance } from "../services/api-client";
import { useState, useEffect } from "react";
const useProfile = (userId) => {
  const [status, setStatus] = useState("");
  const [profileDetails, setProfileDetails] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [friends, setFriends] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setStatus("Loading");
    axiosAuthInstance
      .get(`/users/${userId}/profile-details`)
      .then((response) => {
        setProfileDetails(response.data.data);
        setFriends(response.data.data.friends);
        setStatus("Success");
      })
      .catch((error) => {
        setStatus("Error");
      });
  }, [userId, showEditProfile]);

  const isLoading = status === "Loading";
  const error = status === "Error";

  return {
    isLoading,
    error,
    friends,
    profileDetails,
    posts,
    showEditProfile,
    setShowEditProfile,
  };
};

export default useProfile;
