import { axiosAuthInstance } from "../services/api-client";
import { useState, useEffect } from "react";

const useFriend = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [requestReceived, setRequestReceived] = useState([]);
  const [requestSent, setRequestSent] = useState([]);

  const [usersList, setUsersList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPage, setFirstPage] = useState(1);
  const [query, setQuery] = useState("");

  const LIMIT = 3;
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axiosAuthInstance
      .get(`/users/friends`)
      .then((response) => {
        setFriends(response.data.data.friends);
        setRequestReceived(response.data.data.requestReceived);
        setRequestSent(response.data.data.requestSent);
        setUserFriends(response.data.data);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const unfriend = async (userIdOfFriend) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.delete(
        `/users/friends/${userIdOfFriend}`
      );
      setFriends(response.data.data.friends);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptFriendRequest = async (userIdForFriend) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/accept-request",
        { userIdForFriend }
      );
      setRequestReceived(response.data.data.requestReceived);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const rejectFriendRequest = async (userIdForFriend) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/reject-request",
        { userIdForFriend }
      );
      setRequestReceived(response.data.data.requestReceived);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const searchFriends = async (selectedPage) => {
    const pageSet = Math.ceil(selectedPage / 3);
    setFirstPage(pageSet * 3 - 3 + 1);
    setCurrentPage(selectedPage);

    setIsLoading(true);
    setIsError(false);
    try {
      const response = await axiosAuthInstance.get(
        `/users/find-friends?page=${selectedPage}&limit=${LIMIT}&query=${query}`
      );
      setUsersList(response.data.data.usersList);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isError,
    friends,
    requestReceived,
    requestSent,
    userFriends,
    unfriend,
    acceptFriendRequest,
    rejectFriendRequest,
    usersList,
    totalPages,
    currentPage,
    firstPage,
    setCurrentPage,
    setFirstPage,
    searchFriends,
    query,
    setQuery,
  };
};

export default useFriend;
