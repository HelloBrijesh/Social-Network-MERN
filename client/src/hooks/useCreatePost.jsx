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

const useCreatePost = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [postImage, setPostImage] = useState("");
  const { userDetails } = useUserContext();

  const addPostImage = async (e) => {
    if (postImage !== "") {
      const imageTobeDeleted = postImage?.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/postImages/${imageTobeDeleted}`
      );
      await deleteObject(desertRef);
    }

    try {
      setIsSubmitting(true);
      setIsError(false);
      const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const storageRef = ref(storage, `SocialNetwork/postImages/${imageName}`);
      const snapshot = await uploadBytes(storageRef, e.target.files[0]);
      const downloaded_url = await getDownloadURL(storageRef);
      setPostImage(downloaded_url);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deletePostImage = async () => {
    if (postImage !== "") {
      const imageTobeDeleted = postImage?.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/postImages/${imageTobeDeleted}`
      );
      try {
        setIsSubmitting(true);
        setIsError(false);
        await deleteObject(desertRef);
        setPostImage("");
      } catch (error) {
        setIsError(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const createPost = async (postContent) => {
    try {
      const response = await axiosAuthInstance.post("/users/posts", {
        postImage,
        postContent,
      });
      setPostImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    submitting,
    isError,
    postImage,
    setPostImage,
    addPostImage,
    deletePostImage,
    createPost,
  };
};

export default useCreatePost;
