import { NavLink, Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div>
        <div className="h-[300px] bg-cover-image bg-no-repeat bg-cover bg-center"></div>
        <div className="max-w-5xl mx-auto">
          <div className="flex ms-10 gap-x-10 ">
            <img
              src="/profileImage.jpg"
              alt=""
              className="relative top-[-50px] w-[100px] h-[100px] border-white border-4 rounded-full"
            />
            <p className="text-center mt-5 font-bold tracking-wide text-xl">
              Name
            </p>
          </div>
          <hr className="my-5"></hr>
          <div>
            <ul className="flex gap-5">
              <li className="">
                <NavLink to="/profile/">Timeline</NavLink>
              </li>
              <li className="">
                <NavLink to="about">About</NavLink>
              </li>
              <li className="">
                <NavLink to="friendlist">Friends</NavLink>
              </li>
              <li className="">
                <NavLink to="photos">Photos</NavLink>
              </li>
            </ul>
          </div>
          <hr className="my-5"></hr>
          <div className="">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
