import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center shadow-md fixed w-full z-10 bg-white">
        <div className="text-blue text-2xl font-bold ms-4">Social Network</div>
        <div className="flex justify-around">
          <div className="p-5">
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div className="p-5">
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
          <div className="p-5">
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>
        <img
          src="profileImage.jpg"
          alt=""
          className="w-[30px] h-[30px] rounded-full me-4"
        />
      </nav>
    </>
  );
};

export default Navbar;
