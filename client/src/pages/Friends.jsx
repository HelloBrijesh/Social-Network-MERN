import { NavLink, Outlet } from "react-router-dom";

const Friends = () => {
  return (
    <>
      <div className="relative bg-white-smoke">
        <div className="md:w-1/6 md:h-screen md:fixed md:border-r-2 border-b-2 bg-white">
          <ul className="md:mt-10 md:block ms-5 my-5 flex justify-center items-center gap-x-5">
            <NavLink to="/friends/">
              <li className="">Friends</li>
            </NavLink>
            <li className="md:mt-3">
              <NavLink to="/friends/friend-request/">Friends Requests</NavLink>
            </li>
            <li className="md:mt-3">
              <NavLink to="/friends/find-friends/">Find Friends</NavLink>
            </li>
          </ul>
        </div>
        <div className="md:w-4/6 md:mx-auto flex justify-center min-h-screen pt-10 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Friends;
