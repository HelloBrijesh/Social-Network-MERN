import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between py-3 items-center shadow-md">
        <div className="w-2/5 text-blue text-2xl font-bold ms-10">
          Social Network
        </div>
        <div className="flex w-1/5 justify-around">
          <div>
            <FontAwesomeIcon icon={faHouse} />
          </div>
          <div>
            <FontAwesomeIcon icon={faUserGroup} />
          </div>
          <div>
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>
        <div className="w-2/5">
          <img
            src="profileImage.jpg"
            alt=""
            className="w-[30px] h-[30px] rounded-full mx-auto"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
