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
    <div className="w-full mx-10 flex flex-col items-center gap-y-10 h-full">
      {requestReceived.length === 0 && (
        <p className="font-semibold">No Request</p>
      )}

      {requestReceived.map((request) => (
        <div
          key={request.id}
          className="w-full md:w-[500px] h-full flex justify-between items-center gap-5 p-5 bg-white rounded-lg shadow-xl "
        >
          <div>
            <Link
              to={`/${request.id}/profile`}
              className="flex flex-col md:flex-row items-center gap-5 "
            >
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
                {request.firstName} {request.lastName}
              </h1>
            </Link>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
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
