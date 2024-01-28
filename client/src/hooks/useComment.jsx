import { useEffect, useState, useRef } from "react";
import { axiosAuthInstance } from "../services/api-client";

const useComment = (postId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comments, setComments] = useState([]);

  const commentContentRef = useRef(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axiosAuthInstance
      .get(`/users/posts/${postId}/comments`)
      .then((response) => {
        setComments(response.data.data);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const addComment = async () => {
    const commentContent = commentContentRef.current.value;
    if (commentContent !== false && commentContent !== "") {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axiosAuthInstance.post(
          `/users/posts/${postId}/comment`,
          { commentContent }
        );
        setComments(response.data.data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteComment = async (commentId) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.delete(
        `/users/posts/${postId}/comments/${commentId}`
      );
      setComments(response.data.data);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    comments,
    commentContentRef,
    addComment,
    deleteComment,
  };
};

export default useComment;
