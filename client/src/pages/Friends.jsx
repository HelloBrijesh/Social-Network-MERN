import { NavLink, Outlet } from "react-router-dom";

const Friends = () => {
  return (
    <>
      <div className="">
        <div className="w-1/6 border h-screen fixed">
          <ul className="mt-10 ms-5">
            <li className="">
              <NavLink to="/user/friends/">Friends</NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="friend-request">Friends Requests</NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="find-friends">Find Friends</NavLink>
            </li>
          </ul>
        </div>
        <div className="absolute right-0 w-5/6 pt-10">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Friends;
