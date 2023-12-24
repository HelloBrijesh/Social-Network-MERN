import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UserList from "./UserList";
const FindFriends = () => {
  const [usersList, setUsersList] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [firstPage, setFirstPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 1;

  useEffect(() => {
    axiosAuthInstance
      .get(`/users/friends`)
      .then((response) => {
        setUserFriends(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axiosAuthInstance.get(
        `/users/find-friends?page=${1}&limit=${LIMIT}`
      );
      setUsersList(response.data.data.usersList);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = async (selectedPage) => {
    const pageSet = Math.ceil(selectedPage / 3);
    setFirstPage(pageSet * 3 - 3 + 1);
    setCurrentPage(selectedPage);

    try {
      const response = await axiosAuthInstance.get(
        `/users/find-friends?page=${selectedPage}&limit=${LIMIT}`
      );
      setUsersList(response.data.data.usersList);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

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
            onClick={handleSearch}
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
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>
        </div>
        {Array.from(Array(3), (e, i) => {
          return (
            <button
              key={i}
              onClick={() => handlePageChange(i + firstPage)}
              className={
                currentPage === i + firstPage
                  ? "bg-blue text-white font-semibold border px-4 py-2 rounded-full"
                  : " bg-slate-500 text-white font-semibold border px-4 py-2 rounded-full"
              }
            >
              {firstPage + i}
            </button>
          );
        })}
        <div>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
