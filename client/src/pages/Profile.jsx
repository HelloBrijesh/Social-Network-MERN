import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import ProfileImage from "../components/profile/ProfileImage";
import CoverImage from "../components/profile/CoverImage";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useProfile from "../hooks/useProfile";
const Profile = () => {
  const { userDetails } = useUserContext();
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showCoverImage, setShowCoverImage] = useState(false);

  let { userId } = useParams();
  const { isLoading, error, profileDetails, friends } = useProfile(userId);

  if (profileDetails === null) {
    return <p>Loading</p>;
  }

  return (
    <>
      <div>
        {profileDetails.coverImage === "" ? (
          <div className="h-[300px] cursor-pointer border-y-2 flex justify-center items-center">
            <button
              className="h-full w-full"
              onClick={() => setShowCoverImage(true)}
              disabled={userDetails.id !== profileDetails.id}
            >
              <FontAwesomeIcon
                icon={faUser}
                className=" bg-white-smoke p-4 w-[50px] h-[50px] border-white border-4 rounded-full"
              />
            </button>
          </div>
        ) : (
          <div
            style={{ "--image-url": `url(${profileDetails.coverImage})` }}
            className="h-[300px] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center"
          >
            <button
              onClick={() => setShowCoverImage(true)}
              className="h-full w-full"
              disabled={userDetails.id !== profileDetails.id}
            ></button>
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <div className="flex ms-10 md:gap-x-10 ">
            <button
              className=""
              disabled={userDetails.id !== profileDetails.id}
              onClick={() => setShowProfileImage(true)}
            >
              {profileDetails.profileImage === "" ? (
                <FontAwesomeIcon
                  icon={faUser}
                  className=" bg-white-smoke p-4 relative top-[-40px] w-[50px] h-[50px] border-white border-4 rounded-full"
                />
              ) : (
                <img
                  src={`${profileDetails.profileImage}`}
                  alt=""
                  className="relative top-[-50px] w-[100px] h-[100px] border-white border-4 rounded-full"
                />
              )}
            </button>

            <ProfileImage
              isVisible={showProfileImage}
              onClose={() => setShowProfileImage(false)}
            />
            <CoverImage
              isVisible={showCoverImage}
              onClose={() => setShowCoverImage(false)}
            />
            <p className="text-center mt-5 font-bold tracking-wide text-xl">
              {profileDetails.firstName} {profileDetails.lastName}
            </p>
          </div>
          <hr className="my-5"></hr>
          <div className="flex flex-col items-center">
            <ul className="flex gap-5">
              <li className="">
                <NavLink to={`/${userId}/profile/`}>Timeline</NavLink>
              </li>
              <li className="">
                <NavLink to="about">About</NavLink>
              </li>
              <li className="">
                <NavLink to="friendlist">Friends</NavLink>
              </li>
            </ul>
          </div>
          <hr className="my-5"></hr>
          <div className="pt-10 pb-28">
            {profileDetails && <Outlet context={friends} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
