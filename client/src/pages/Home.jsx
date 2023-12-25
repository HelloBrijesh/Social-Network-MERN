import { Link } from "react-router-dom";
import POSTS from "../components/posts/Posts";
import CreatePost from "../components/posts/CreatePost";
import { useState, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { axiosAuthInstance } from "../services/api-client";
const Home = () => {
  const [showCreatePost, setCreatePost] = useState(false);
  const { userDetails } = useUserContext();
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setStatus("Loading");
    axiosAuthInstance
      .get("/users/posts")
      .then((response) => {
        setPosts(response.data.data);
        setStatus("Success");
      })
      .catch((error) => {
        setStatus("Error");
      });
  }, []);
  const isLoading = status === "Loading";
  const error = status === "Error";

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
        <div className="md:w-4/6 md:mx-auto mx-5 flex flex-col items-center gap-y-5 pt-10">
          <div className="w-full md:w-[500px] bg-white rounded-lg shadow-lg">
            <div className="flex gap-3 m-3 items-center">
              <div className="">
                {userDetails.profileImage === "" ? (
                  <FontAwesomeIcon
                    icon={faUser}
                    className="w-[20px] h-[20px] bg-white-smoke p-3 rounded-full border-white border-4"
                  />
                ) : (
                  <img
                    src={`${userDetails.profileImage}`}
                    alt=""
                    className="w-[60px] h-[50px] rounded-full border-white border-4"
                  />
                )}
              </div>

              <button
                onClick={() => {
                  setCreatePost(true);
                }}
                className="font-bolder text-start p-3 bg-white-smoke w-full rounded-3xl text-slate-500"
              >
                What&apos;s on your mind, {userDetails?.firstName} ?{" "}
              </button>
            </div>
            <hr className="mx-3"></hr>
            <div className="flex justify-around font-bold text-slate-600 py-3">
              <span>Live Video</span>
              <span>Photo/video</span>
              <span>Felling/Activity</span>
            </div>
          </div>
          <CreatePost
            isVisible={showCreatePost}
            onClose={() => setCreatePost(false)}
          ></CreatePost>
          <div className="w-full ">
            <POSTS posts={posts} status={status} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
