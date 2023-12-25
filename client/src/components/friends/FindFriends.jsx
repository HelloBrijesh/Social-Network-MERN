import UserList from "./UserList";
import useFriend from "../../hooks/useFriend";
const FindFriends = () => {
  const {
    isLoading,
    error,
    userFriends,
    usersList,
    totalPages,
    currentPage,
    firstPage,
    searchFriends,
  } = useFriend();

  return (
    <div className="w-[600px] flex flex-col gap-y-10 items-center">
      <div className="">
        <div className="text-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter text to search"
            className="my-3 border rounded-lg p-3 focus:outline-none"
          />
          <button
            onClick={() => searchFriends(1)}
            className="ms-5 bg-blue py-3 px-8 text-white rounded-xl"
          >
            Search
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 mb-20">
        {usersList.map((user) => (
          <UserList
            key={user.id}
            user={user}
            userFriends={userFriends}
          ></UserList>
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <div>
          <button
            disabled={currentPage === 1}
            onClick={() => searchFriends(currentPage - 1)}
          >
            Prev
          </button>
        </div>
        {Array.from(Array(3), (e, i) => {
          return (
            <div key={i}>
              {firstPage + i <= totalPages && (
                <button
                  onClick={() => searchFriends(i + firstPage)}
                  className={
                    currentPage === i + firstPage
                      ? "bg-blue text-white font-semibold border px-4 py-2 rounded-full"
                      : " bg-slate-500 text-white font-semibold border px-4 py-2 rounded-full"
                  }
                >
                  {i + firstPage}
                </button>
              )}
            </div>
          );
        })}
        <div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => searchFriends(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
