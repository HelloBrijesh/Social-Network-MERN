import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { useOutletContext } from "react-router-dom";
const ProfileFriends = () => {
  const friends = useOutletContext();
  return (
    <div className="mx-10">
      <div>
        {friends.length === 0 && (
          <p className="text-center font-semibold">No Friends</p>
        )}
      </div>
      <div className="flex gap-5 flex-wrap">
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
              <h1 className="bg-white p-3 text-center">
                {friend.firstName} {friend.lastName}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileFriends;
