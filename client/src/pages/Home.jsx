import { Link } from "react-router-dom";
import POSTS from "../components/posts/Posts";
import { useUserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { userDetails } = useUserContext();

  return (
    <>
      <div className="bg-white-smoke min-h-screen w-full">
        <div className="md:w-1/6 fixed">
          <div className="mt-10 hidden md:flex flex-col items-center">
            <Link
              to={`${userDetails.id}/profile/`}
              className="hover:font-bold "
            >
              <div className="">
                {userDetails.profileImage === "" ? (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-[60px] h-[60px]  rounded-full p-5 border-white border-4"
                  />
                ) : (
                  <img
                    src={`${userDetails.profileImage}`}
                    alt=""
                    className="w-[100px] h-[100px] rounded-full border-white border-4"
                  />
                )}
              </div>
              <p className="text-center mt-4 font-bolder">
                {userDetails.firstName} {userDetails.lastName}
              </p>
            </Link>
            <ul className="pt-5">
              <Link to="/friends/">
                <li className="px-8 py-3 hover:font-bold">Find Friends</li>
              </Link>
              <Link to="#">
                <li className="px-8 pb-3 hover:font-bold">Groups</li>
              </Link>
              <Link to="#">
                <li className="px-8 hover:font-bold">Marketplace</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="md:w-4/6 md:mx-auto mx-5 pt-10">
          <POSTS />
        </div>
      </div>
    </>
  );
};

export default Home;
