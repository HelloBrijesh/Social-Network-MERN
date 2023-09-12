import { Outlet, NavLink } from "react-router-dom";

const Friends = () => {
  return (
    <>
      <div className="flex">
        <div className="fixed h-screen bg-white-smoke w-1/6 border-r-2 pt-10">
          <ul className="pt-10 mt-5">
            <NavLink
              to="/user/friends/"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-blue border-b-4 border-b-blue"
                  : ""
              }
            >
              <li className="px-5 py-3">All Friends</li>
            </NavLink>
            <NavLink
              to="/user/friends/friendrequests"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-blue border-b-4 border-b-blue"
                  : ""
              }
            >
              <li className="px-5 py-3">Friend Requests</li>
            </NavLink>
            <NavLink
              to="/user/friends/find"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-blue border-b-4 border-b-blue"
                  : ""
              }
            >
              <li className="px-5 py-3">Find Friends</li>
            </NavLink>
          </ul>
        </div>
        <div className="absolute right-0 w-5/6 justify-end mt-5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Friends;
