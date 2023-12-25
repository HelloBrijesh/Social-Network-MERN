import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useFriend from "../../hooks/useFriend";

const FriendRequest = () => {
  const {
    isLoading,
    error,
    requestReceived,
    acceptFriendRequest,
    rejectFriendRequest,
  } = useFriend();

  return (
    <div className="flex flex-col gap-y-10 h-full">
      {requestReceived.map((request) => (
        <div
          key={request.id}
          className="w-[500px] h-full flex justify-between items-center gap-5 p-5 bg-white rounded-lg shadow-xl "
        >
          <div className=" flex items-center gap-5 ">
            <Link to={`/${request.id}/profile`}>
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
            </Link>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => acceptFriendRequest(request.id)}
              className=" bg-green-500 text-white px-3 py-2"
            >
              Accept
            </button>
            <button
              onClick={() => rejectFriendRequest(request.id)}
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
