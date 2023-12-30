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
    setQuery,
    searchFriends,
  } = useFriend();

  return (
    <div className="w-full mx-10 flex flex-col gap-y-10 items-center">
      <div className="">
        <div className="flex md:flex-row flex-col">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter text to search"
            className="border rounded-lg p-3 focus:outline-none"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button
            onClick={() => searchFriends(1)}
            className="md:ms-5 mt-5 md:mt-0 bg-blue py-3 px-8 text-white rounded-xl"
          >
            Search
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
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
            disabled={currentPage === 1 || usersList.length === 0}
            onClick={() => searchFriends(currentPage - 1)}
            className="font-semibold disabled:font-normal disabled:opacity-70"
          >
            Prev
          </button>
        </div>
        <div className="flex gap-3">
          {usersList.length === 0 ? (
            <div className="bg-slate-500 text-white font-semibold border px-4 py-2 rounded-full">
              1
            </div>
          ) : (
            Array.from(Array(3), (e, i) => {
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
            })
          )}
        </div>

        <div>
          <button
            disabled={currentPage === totalPages || usersList.length === 0}
            onClick={() => searchFriends(currentPage + 1)}
            className="font-semibold disabled:font-normal disabled:opacity-70"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
