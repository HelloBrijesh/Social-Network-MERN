import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="">
        <div className="w-1/6 border h-screen fixed">
          <div className="mt-10">
            <img
              src="/profileImage.jpg"
              alt=""
              className="w-[100px] h-[100px] rounded-full mx-auto"
            />
            <p className="text-center mt-5">Name</p>
          </div>

          <ul className="mt-10 ms-10">
            <li className="">
              <NavLink to="/user/profile/">Timeline</NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="about">About</NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="friendlist">Friends</NavLink>
            </li>
            <li className="mt-3">
              <NavLink to="photos">Photos</NavLink>
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

export default Profile;
