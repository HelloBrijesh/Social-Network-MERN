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
  const [status, setStatus] = useState("");
  const [postImage, setPostImage] = useState("");
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
      setStatus("Loading");
      const imageName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const storageRef = ref(storage, `SocialNetwork/postImages/${imageName}`);
      const snapshot = await uploadBytes(storageRef, e.target.files[0]);
      const downloaded_url = await getDownloadURL(storageRef);
      setPostImage(downloaded_url);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };

  const deletePostImage = async () => {
    if (postImage !== "") {
      const imageTobeDeleted = postImage?.split("2F")[2].split("?")[0];
      const desertRef = ref(
        storage,
        `SocialNetwork/postImages/${imageTobeDeleted}`
      );
      setStatus("Loading");
      try {
        await deleteObject(desertRef);
        setPostImage("");
        setStatus("Success");
      } catch (error) {
        setStatus("Error");
      }
    }
  };
  const createPost = async (postContent) => {
    setStatus("Loading");
    try {
      const response = await axiosAuthInstance.post("/users/posts", {
        postImage,
        postContent,
      });
      setPostImage("");
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };
  const editPost = async (postContent, postId) => {
    setStatus("Loading");
    try {
      const response = await axiosAuthInstance.put(`/users/posts/${postId}`, {
        postImage,
        postContent,
      });
      setPostImage("");
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };
  const isLoading = status === "Loading";
  const error = status === "Error";
  return {
    isLoading,
    error,
    postImage,
    setPostImage,
    addPostImage,
    deletePostImage,
    createPost,
    editPost,
  };
};

export default usePost;
