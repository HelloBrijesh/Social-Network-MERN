import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Profile = () => {
  return (
    <>
      <div className="flex">
        <div className="h-screen w-2/5 border-r-2">
          <img src="banner.jpg" alt="" className="h-[250px] w-full" />
          <div className="px-10">
            <div className="">
              <img
                src="profileImage.jpg"
                alt=""
                className="w-[80px] h-[80px] rounded-full relative bottom-10 border-white border-4"
              />
              <h1>Name</h1>
              <p>Bio</p>
            </div>

            <div className="flex justify-around border-t-2 border-b-2 text-center my-3 py-2">
              <div className="">
                <p>10.1M</p>
                <p>Followers</p>
              </div>
              <div>
                <p>1K</p>
                <p>Following</p>
              </div>
              <div>
                <p>400</p>
                <p>Posts</p>
              </div>
            </div>

            <div className="my-5">
              <p className="my-3">
                Lives in <b> Hawkins, Indiana </b>
              </p>
              <p className="my-3">
                Goes to <b> Howkins Middle School </b>
              </p>
              <p className="my-3">in a relationship</p>
            </div>
            <ul className="mt-5 border rounded-2xl p-2 flex justify-around">
              <NavLink
                to="/user/profile/timeline"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-blue border-b-4 border-b-blue"
                    : ""
                }
              >
                <li>Timeline</li>
              </NavLink>
              <NavLink
                to="/user/profile/about/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-blue border-b-4 border-b-blue"
                    : ""
                }
              >
                <li>About</li>
              </NavLink>

              <NavLink
                to="/user/profile/friends/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-blue border-b-4 border-b-blue"
                    : ""
                }
              >
                <li>Friends</li>
              </NavLink>

              <NavLink
                to="/user/profile/photos/"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "text-blue border-b-4 border-b-blue"
                    : ""
                }
              >
                <li>Photos</li>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="w-3/5">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Profile;
