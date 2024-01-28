import { storage } from "../services/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { axiosAuthInstance } from "../services/api-client";
import { useState } from "react";

const usePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const addPostImage = async (e, postImage) => {
    setIsLoading(true);
    setIsError(false);
    if (postImage !== "") {
      const imageTobeDeleted = postImage?.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/postImages/${imageTobeDeleted}`
      );
      try {
        await deleteObject(desertRef);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    try {
      setIsLoading(true);
      setIsError(false);
      const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const storageRef = ref(storage, `SocialNetwork/postImages/${imageName}`);
      const snapshot = await uploadBytes(storageRef, e.target.files[0]);
      const downloaded_url = await getDownloadURL(storageRef);
      return downloaded_url;
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePostImage = async (postImage) => {
    setIsLoading(true);
    setIsError(false);
    if (postImage !== "") {
      const imageTobeDeleted = postImage?.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/postImages/${imageTobeDeleted}`
      );
      try {
        await deleteObject(desertRef);
        return "";
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const createPost = async (postContent, postImage) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.post("/users/posts", {
        postContent,
        postImage,
      });
      return response.data.data;
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const editPost = async (postId, postContent, postImage) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.put(`/users/posts/${postId}`, {
        postContent,
        postImage,
      });
      return response.data.data;
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    addPostImage,
    deletePostImage,
    createPost,
    editPost,
  };
};

export default usePost;
