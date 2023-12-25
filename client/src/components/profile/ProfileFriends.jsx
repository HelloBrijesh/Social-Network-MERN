import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";

const ProfileFriends = () => {
  let { userId } = useParams();

  const { isLoading, error, friends } = useProfile(userId);

  return (
    <div>
      <div>
        {friends.length === 0 && (
          <p className="text-center font-semibold">No Friends</p>
        )}
      </div>
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
