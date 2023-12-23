import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import { useParams } from "react-router-dom";

const ProfileFriends = () => {
  const [friends, setFriends] = useState([]);

  let { userId } = useParams();
  useEffect(() => {
    axiosAuthInstance
      .get(`/users/${userId}/friends`)
      .then((response) => {
        setFriends(response.data.data.friends);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div>{friends.length === 0 && <p>No Friends</p>}</div>
      <div>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="w-[150px] border rounded-lg overflow-hidden shadow-2xl "
          >
            <Link to={`/${friend.id}/profile`}>
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
            </Link>
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

export default ProfileFriends;
