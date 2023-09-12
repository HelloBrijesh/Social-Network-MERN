import { Outlet, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRss } from "@fortawesome/free-solid-svg-icons";
// import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
// import { faMessage } from "@fortawesome/free-solid-svg-icons";
// import { faImage } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <div className="flex">
        <div className="h-screen fixed w-1/6 bg-white-smoke border-r-2 pt-10">
          <div className="py-5">
            <Link to="/user/profile/">
              <img
                src="profileImage.jpg"
                alt=""
                className="w-[100px] h-[100px] mx-auto rounded-full border-4 border-white shadow-md"
              />
              <p className="text-center my-5">Name </p>
            </Link>
          </div>
          {/* <ul className="px-10">
          <NavLink
            to="/home/"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "text-blue border-b-4 border-b-blue"
                : ""
            }
          >
            <li className="py-3">
              <FontAwesomeIcon icon={faRss} className="me-3" /> Feed
            </li>
          </NavLink>
          
        </ul> */}
        </div>
        <div className="w-5/6 text-center mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Home;
