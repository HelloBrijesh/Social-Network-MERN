import { NavLink, Outlet } from "react-router-dom";

const Friends = () => {
  return (
    <>
      <div className="relative">
        <div className="w-1/6 h-screen fixed border-r-2 bg-white">
          <ul className="mt-10 ms-5">
            <NavLink to="/friends/">
              <li className="">Friends</li>
            </NavLink>
            <li className="mt-3">
              <NavLink to="/friends/friend-request/">Friends Requests</NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="/friends/find-friends/">Find Friends</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex justify-center min-h-screen pt-10 bg-white-smoke">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Friends;
