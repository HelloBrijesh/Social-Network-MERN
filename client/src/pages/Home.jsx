import { Link } from "react-router-dom";
import POSTS from "../components/Posts";
import CreatePost from "../components/CreatePost";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { axiosInstance } from "../services/api-client";
const Home = () => {
  const [showCreatePost, setCreatePost] = useState(false);
  const { userDetails } = useUserContext();

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.post(
        "/users",
        {},
        { withCredentials: true }
      );
      console.log(res);
    };

    getUser();
  }, []);

  return (
    <>
      <div className="bg-white-smoke min-h-screen">
        <div className="w-1/6 fixed">
          <div className="mt-10">
            <Link to="/profile/" className="hover:font-bold">
              <img
                src="/profileImage.jpg"
                alt=""
                className="w-[100px] h-[100px] mx-auto rounded-full border-white border-4"
              />
              <p className="text-center mt-4 font-bolder">Name </p>
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
        <div className=" flex flex-col items-center justify-center pt-10">
          <div className="w-[500px] bg-white rounded-lg shadow-lg">
            <div className="flex gap-3 m-3 items-center">
              <img
                src="/profileImage.jpg"
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
              <button
                onClick={() => {
                  setCreatePost(true);
                }}
                className="font-bolder text-start p-3 bg-white-smoke w-full rounded-3xl text-slate-500"
              >
                What&apos;s on your mind, Brijesh ?{" "}
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
          <div className="flex justify-center pt-10">
            <POSTS />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
