import { useEffect, useState, useRef } from "react";
import { axiosAuthInstance } from "../services/api-client";

const useComment = (postId) => {
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState([]);

  const commentContentRef = useRef(false);

  useEffect(() => {
    setStatus("Loading");
    axiosAuthInstance
      .get(`/users/posts/${postId}/comments`)
      .then((response) => {
        setComments(response.data.data);
        setStatus("Success");
      })
      .catch((error) => {
        console.log(error);
        setStatus("Error");
      });
  }, []);

  const addComment = async () => {
    const commentContent = commentContentRef.current.value;
    if (commentContent !== false && commentContent !== "") {
      setStatus("Loading");

      try {
        const response = await axiosAuthInstance.post(
          `/users/posts/${postId}/comment`,
          { commentContent }
        );
        setComments(response.data.data);
        setStatus("Success");
      } catch (error) {
        console.log(error);
        setStatus("Error");
      }
    }
  };

  const deleteComment = async (commentId) => {
    setStatus("Loading");
    try {
      const response = await axiosAuthInstance.delete(
        `/users/posts/${postId}/comments/${commentId}`
      );
      setComments(response.data.data);
      setStatus("Success");
    } catch (error) {
      console.log(error);
      setStatus("Error");
    }
  };

  const isLoading = status === "Loading";
  const error = status === "Error";

  return {
    isLoading,
    error,
    comments,
    commentContentRef,
    addComment,
    deleteComment,
  };
};

export default useComment;
