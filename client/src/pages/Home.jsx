import { Link } from "react-router-dom";
import POSTS from "../components/Posts";
const Home = () => {
  return (
    <>
      <div className="relative">
        <div className="w-1/6 border h-screen fixed">
          <div className="mt-10">
            <Link to="/user/profile/">
              <img
                src="/profileImage.jpg"
                alt=""
                className="w-[100px] h-[100px] mx-auto rounded-full"
              />
              <p className="text-center mt-4">Name </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <POSTS />
        </div>
      </div>
    </>
  );
};

export default Home;
