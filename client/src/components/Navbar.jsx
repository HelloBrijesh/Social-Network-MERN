import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { axiosAuthInstance } from "../services/api-client";
import axios from "axios";
const Navbar = () => {
  const { updateLoginStatus, updateUserDetails } = useUserContext();
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
      updateLoginStatus(false);
      updateUserDetails(null);
      window.location = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center shadow-md fixed w-full z-10 bg-white">
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
          <div className=" cursor-pointer" onClick={logout}>
            Logout
          </div>
          <img
            src="/profileImage.jpg"
            alt=""
            className="w-[30px] h-[30px] rounded-full mx-5"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
