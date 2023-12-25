import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useFriend from "../../hooks/useFriend";

const FriendList = () => {
  const { isLoading, error, friends, unfriend } = useFriend();

  return (
    <div className="w-[700px] ml-auto h-full">
      <div className="flex gap-4 justify-start">
        {friends.length === 0 && <p>No Friends</p>}

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
              onClick={() => unfriend(friend.id)}
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
