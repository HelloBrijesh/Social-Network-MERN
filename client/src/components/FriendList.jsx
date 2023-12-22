import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../services/api-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axiosAuthInstance
      .get("/users/friends")
      .then((response) => {
        setFriends(response.data.data.friends);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleUnfriend = async (userIdOfFriend) => {
    try {
      const response = await axiosAuthInstance.delete(
        `/users/friends/${userIdOfFriend}`
      );
      setFriends(response.data.data.friends);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[700px] ml-auto h-full">
      <div className="flex gap-4 justify-start">
        {friends.length === 0 && <p>No Friends</p>}

        {friends.map((friend) => (
          <div
            key={friend.id}
            className="w-[150px] border rounded-lg overflow-hidden shadow-2xl "
          >
            {friend.profileImage === "" ? (
              <FontAwesomeIcon icon={faUser} className="w-full h-[150px] " />
            ) : (
              <img
                src={`${friend.profileImage}`}
                alt=""
                className="w-full h-[150px]"
              />
            )}

            <h1 className="bg-white p-3">
              {friend.firstName} {friend.lastName}
            </h1>
            <button
              onClick={() => handleUnfriend(friend.id)}
              className="py-2 w-full bg-red-500 text-white"
            >
              Unfriend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
