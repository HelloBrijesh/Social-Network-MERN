import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../services/api-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const FriendRequest = () => {
  const [requestReceived, setRequestReceived] = useState([]);

  useEffect(() => {
    axiosAuthInstance
      .get("/users/friends")
      .then((response) => {
        setRequestReceived(response.data.data.requestReceived);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleAcceptFriendRequest = async (userIdForFriend) => {
    try {
      const response = await axiosAuthInstance.post(
        "/users/friends/accept-request",
        { userIdForFriend }
      );
      setRequestReceived(response.data.data.requestReceived);
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
      setRequestReceived(response.data.data.requestReceived);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-y-10 h-full">
      {requestReceived.map((request) => (
        <div
          key={request.id}
          className="w-[500px] h-full flex justify-between items-center gap-5 p-5 bg-white rounded-lg shadow-xl "
        >
          <div className=" flex items-center gap-5 ">
            {request.profileImage === "" ? (
              <FontAwesomeIcon
                icon={faUser}
                className="w-[50px] h-[50px] rounded-full "
              />
            ) : (
              <img
                src={`${request.profileImage}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
            )}
            <h1 className="">
              {request.fistName} {request.lastName}
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleAcceptFriendRequest(request.id)}
              className=" bg-green-500 text-white px-3 py-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleRejectFriendRequest(request.id)}
              className=" bg-red-500 text-white px-3 py-2"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequest;
