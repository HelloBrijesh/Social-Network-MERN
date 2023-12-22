import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../services/api-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UserList({ user, userFriends }) {
  const [friendList, setFriendList] = useState(userFriends.friends);
  const [received, setReceived] = useState(userFriends.requestReceived);
  const [sent, setSent] = useState(userFriends.requestSent);

  const [isFriend, setIsFriend] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    setIsFriend(friendList.find((obj) => obj.id === user.id));
    setIsReceived(received.find((obj) => obj.id === user.id));
    setIsSent(sent.find((obj) => obj.id === user.id));
  }, [friendList, received, sent]);

  const handleSendFriendRequest = async (userIdForFriend) => {
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/send-request",
        { userIdForFriend }
      );
      setFriendList(response.data.data.friends);
      setReceived(response.data.data.requestReceived);
      setSent(response.data.data.requestSent);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelFriendRequest = async (userIdForFriend) => {
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/remove-request",
        { userIdForFriend }
      );
      setFriendList(response.data.data.friends);
      setReceived(response.data.data.requestReceived);
      setSent(response.data.data.requestSent);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFriend = async (userIdOfFriend) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/users/friends/${userIdOfFriend}`
      );

      setFriendList(response.data.data.friends);
      setReceived(response.data.data.requestReceived);
      setSent(response.data.data.requestSent);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAcceptFriendRequest = async (userIdForFriend) => {
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/accept-request",
        { userIdForFriend }
      );

      setFriendList(response.data.data.friends);
      setReceived(response.data.data.requestReceived);
      setSent(response.data.data.requestSent);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRejectFriendRequest = async (userIdForFriend) => {
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/reject-request",
        { userIdForFriend }
      );

      setFriendList(response.data.data.friends);
      setReceived(response.data.data.requestReceived);
      setSent(response.data.data.requestSent);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[500px] flex justify-between items-center p-5 bg-white rounded-lg shadow-xl">
      <div className=" flex items-center gap-5 ">
        {user.profileImage === "" ? (
          <FontAwesomeIcon
            icon={faUser}
            className="w-[50px] h-[50px] rounded-full "
          />
        ) : (
          <img
            src={`${user.profileImage}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
        )}
        <h1 className="">
          {user.firstName} {user.lastName}
        </h1>
      </div>
      <div className="flex gap-3">
        {isFriend && (
          <button
            onClick={() => handleUnFriend(user.id)}
            className="text-red-500 font-bold"
          >
            Unfriend
          </button>
        )}
        {isReceived && (
          <div>
            <button
              onClick={() => handleAcceptFriendRequest(user.id)}
              className="text-green-500 font-bold"
            >
              Accept
            </button>
            <button
              onClick={() => handleRejectFriendRequest(user.id)}
              className="text-red-500 font-bold ms-5"
            >
              Reject
            </button>
          </div>
        )}
        {isSent && (
          <button
            onClick={() => handleCancelFriendRequest(user.id)}
            className="text-blue font-bold"
          >
            Cancel Request
          </button>
        )}

        {!isFriend && !isReceived && !isSent && (
          <button
            onClick={() => handleSendFriendRequest(user.id)}
            className="text-blue font-bold"
          >
            Send Request
          </button>
        )}
      </div>
    </div>
  );
}

export default UserList;
