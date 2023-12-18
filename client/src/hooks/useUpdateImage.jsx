import { storage } from "../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { axiosAuthInstance } from "../services/api-client";
import { useUserContext } from "../context/UserContext";
import { useState } from "react";

const useUpdateImage = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const { userDetails, updateUserDetails } = useUserContext();

  const updateCoverImage = async (e) => {
    if (userDetails.coverImage !== "") {
      const imageTobeDeleted = userDetails?.coverImage
        ?.split("2F")[2]
        .split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/coverImages/${imageTobeDeleted}`
      );
      await deleteObject(desertRef);
    }
    const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    try {
      setIsSubmitting(true);
      setIsError(false);
      const storageRef = ref(storage, `SocialNetwork/coverImages/${imageName}`);
      const snapshot = await uploadBytes(storageRef, e.target.files[0]);
      const downloaded_url = await getDownloadURL(storageRef);

      const response = await axiosAuthInstance.put(`/users/cover-image`, {
        coverImageUrl: downloaded_url,
      });

      updateUserDetails(response.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteCoverImage = async () => {
    if (userDetails.coverImage !== "") {
      const imageTobeDeleted = userDetails?.coverImage
        ?.split("2F")[2]
        .split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/coverImages/${imageTobeDeleted}`
      );
      try {
        setIsSubmitting(true);
        setIsError(false);

        await deleteObject(desertRef);
        const response = await axiosAuthInstance.delete(
          `/users/cover-image`,
          {}
        );

        updateUserDetails(response.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateProfileImage = async (e) => {
    if (userDetails.profileImage !== "") {
      const imageTobeDeleted = userDetails?.profileImage
        ?.split("2F")[2]
        .split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/profileImages/${imageTobeDeleted}`
      );
      await deleteObject(desertRef);
    }
    const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    try {
      setIsSubmitting(true);
      setIsError(false);
      const storageRef = ref(
        storage,
        `SocialNetwork/profileImages/${imageName}`
      );
      const snapshot = await uploadBytes(storageRef, e.target.files[0]);
      const downloaded_url = await getDownloadURL(storageRef);

      const response = await axiosAuthInstance.put(`/users/profile-image`, {
        profileImageUrl: downloaded_url,
      });

      updateUserDetails(response.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  const deleteProfileImage = async () => {
    if (userDetails.profileImage !== "") {
      const imageTobeDeleted = userDetails?.profileImage
        ?.split("2F")[2]
        .split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/profileImages/${imageTobeDeleted}`
      );
      await deleteObject(desertRef);

      try {
        setIsSubmitting(true);
        setIsError(false);

        const response = await axiosAuthInstance.delete(
          `/users/profile-image`,
          {}
        );

        updateUserDetails(response.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return {
    submitting,
    isError,
    updateCoverImage,
    deleteCoverImage,
    updateProfileImage,
    deleteProfileImage,
  };
};

export default useUpdateImage;
