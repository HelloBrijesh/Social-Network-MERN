import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <>
      <div className="">
        <div className="py-5">
          <img
            src="profileImage.jpg"
            alt=""
            className="w-[100px] h-[100px] mx-auto rounded-full border-4 border-white shadow-md"
          />
          <p className="text-center my-5">Name </p>
        </div>
        <div className="flex flex-col px-10">
          <div className="py-3">
            <FontAwesomeIcon icon={faRss} className="me-3" /> Feed
          </div>
          <div className="py-3">
            {" "}
            <FontAwesomeIcon icon={faUserGroup} className="me-3" />
            Friends
          </div>
          <div className="py-3">
            <FontAwesomeIcon icon={faMessage} className="me-3" /> Messages
          </div>
          <div className="py-3">
            <FontAwesomeIcon icon={faImage} className="me-3" />
            Photos
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
