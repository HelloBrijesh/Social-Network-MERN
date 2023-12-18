import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import ProfileImage from "../components/ProfileImage";
import CoverImage from "../components/CoverImage";
import { useState } from "react";
const Profile = () => {
  const { userDetails } = useUserContext();
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showCoverImage, setShowCoverImage] = useState(false);
  return (
    <>
      <div>
        {userDetails.coverImage === "" ? (
          <div
            onClick={() => setShowCoverImage(true)}
            className="h-[300px] cursor-pointer border-y-2 flex justify-center items-center"
          >
            <FontAwesomeIcon
              icon={faUser}
              className=" bg-white-smoke p-4 cursor-pointer  w-[50px] h-[50px] border-white border-4 rounded-full"
            />
          </div>
        ) : (
          <div
            onClick={() => setShowCoverImage(true)}
            style={{ "--image-url": `url(${userDetails.coverImage})` }}
            className="h-[300px] cursor-pointer bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center"
          ></div>
        )}

        <div className="max-w-5xl mx-auto">
          <div className="flex ms-10 gap-x-10 ">
            <div className="" onClick={() => setShowProfileImage(true)}>
              {userDetails.profileImage === "" ? (
                <FontAwesomeIcon
                  icon={faUser}
                  className=" bg-white-smoke p-4 relative cursor-pointer top-[-40px] w-[50px] h-[50px] border-white border-4 rounded-full"
                />
              ) : (
                <img
                  src={`${userDetails.profileImage}`}
                  alt=""
                  className="relative cursor-pointer top-[-50px] w-[100px] h-[100px] border-white border-4 rounded-full"
                />
              )}
            </div>

            <ProfileImage
              isVisible={showProfileImage}
              onClose={() => setShowProfileImage(false)}
            />
            <CoverImage
              isVisible={showCoverImage}
              onClose={() => setShowCoverImage(false)}
            />
            <p className="text-center mt-5 font-bold tracking-wide text-xl">
              {userDetails.firstName} {userDetails.lastName}
            </p>
          </div>
          <hr className="my-5"></hr>
          <div className="flex flex-col items-center">
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
          <div className="pt-10 pb-28">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
