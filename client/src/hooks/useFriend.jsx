import { axiosAuthInstance } from "../services/api-client";
import { useState, useEffect } from "react";

const useFriend = () => {
  const [status, setStatus] = useState("");
  const [friends, setFriends] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [requestReceived, setRequestReceived] = useState([]);
  const [requestSent, setRequestSent] = useState([]);

  const [usersList, setUsersList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPage, setFirstPage] = useState(1);

  const LIMIT = 3;
  useEffect(() => {
    setStatus("Loading");
    axiosAuthInstance
      .get(`/users/friends`)
      .then((response) => {
        setFriends(response.data.data.friends);
        setRequestReceived(response.data.data.requestReceived);
        setRequestSent(response.data.data.requestSent);
        setUserFriends(response.data.data);
        setStatus("Success");
      })
      .catch((error) => {
        setStatus("Error");
      });
  }, []);

  const unfriend = async (userIdOfFriend) => {
    status("Loading");
    try {
      const response = await axiosAuthInstance.delete(
        `/users/friends/${userIdOfFriend}`
      );
      setFriends(response.data.data.friends);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };

  const acceptFriendRequest = async (userIdForFriend) => {
    status("Loading");
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/accept-request",
        { userIdForFriend }
      );
      setRequestReceived(response.data.data.requestReceived);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };

  const rejectFriendRequest = async (userIdForFriend) => {
    status("Loading");
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/reject-request",
        { userIdForFriend }
      );
      setRequestReceived(response.data.data.requestReceived);
      setStatus("Success");
    } catch (error) {
      setStatus("Error");
    }
  };

  const searchFriends = async (selectedPage) => {
    setStatus("Loading");
    const pageSet = Math.ceil(selectedPage / 3);
    setFirstPage(pageSet * 3 - 3 + 1);
    setCurrentPage(selectedPage);
    try {
      const response = await axiosAuthInstance.get(
        `/users/find-friends?page=${selectedPage}&limit=${LIMIT}`
      );
      setUsersList(response.data.data.usersList);
      setTotalPages(response.data.data.totalPages);
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
  };
};

export default useFriend;
