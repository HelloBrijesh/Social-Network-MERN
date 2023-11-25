import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center shadow-md fixed w-full z-10 bg-white">
        <div className="text-blue text-2xl font-bold ms-4 basis-2/5">
          <Link to="/user/"> Social Network </Link>
        </div>

        <ul className="flex justify-around basis-1/5">
          <NavLink to="/user/">
            <li className="p-5">
              <FontAwesomeIcon icon={faHouse} />
            </li>
          </NavLink>
          <NavLink to="/user/friends">
            <li className="p-5">
              <FontAwesomeIcon icon={faUserGroup} />
            </li>
          </NavLink>
        </ul>

        <div className="flex items-center justify-end basis-2/5">
          <div className="me-5">
            <FontAwesomeIcon icon={faBell} />
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
