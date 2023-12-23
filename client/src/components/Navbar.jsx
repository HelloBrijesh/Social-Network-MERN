import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { Link, NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { axiosAuthInstance } from "../services/api-client";
import axios from "axios";
import { useState } from "react";
const Navbar = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { userDetails, updateUserDetails } = useUserContext();

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      delete axiosAuthInstance.defaults.headers.common["authorization"];
      updateUserDetails(null);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex fixed z-10 justify-between items-center shadow-md w-full bg-white">
        <div className="text-blue text-2xl font-bold ms-4 basis-2/5">
          <NavLink to="/"> Social Network </NavLink>
        </div>

        <ul className="flex justify-around basis-1/5">
          <NavLink to="">
            <li className="p-5">
              <FontAwesomeIcon icon={faHouse} />
            </li>
          </NavLink>
          <NavLink to="/friends/">
            <li className="p-5">
              <FontAwesomeIcon icon={faUserGroup} />
            </li>
          </NavLink>
        </ul>

        <div className="flex items-center justify-end basis-2/5">
          <div className="me-5">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div
            className="mx-3 cursor-pointer"
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            {userDetails.profileImage === "" ? (
              <FontAwesomeIcon
                icon={faUser}
                className="w-[20px] h-[20px] p-2 bg-white-smoke  rounded-full border-white border-4"
              />
            ) : (
              <img
                src={`${userDetails.profileImage}`}
                alt=""
                className="w-[40px] h-[40px] rounded-full border-white border-4"
              />
            )}
          </div>
          {showUserMenu && (
            <ul className="absolute top-[65px] bg-slate-500 text-white right-[20px] font-base border">
              <Link to="#" onClick={() => setShowUserMenu(false)}>
                <li className="py-3 px-5 tracking-wide hover:font-semibold hover:text-red-700">
                  Delete Account
                </li>
              </Link>
              <hr className="text-white"></hr>
              <Link
                to="/change-password"
                onClick={() => setShowUserMenu(false)}
              >
                <li className="py-3 px-5 tracking-wide hover:font-semibold">
                  Change Password
                </li>
              </Link>
              <hr className="text-white"></hr>

              <li
                className=" cursor-pointer tracking-wide py-3 px-5 hover:font-semibold"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
