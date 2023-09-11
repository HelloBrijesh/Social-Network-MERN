import Navbar from "../components/Navbar";
import HomeSidebar from "../components/HomeSidebar";
import Post from "../components/Post";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen relative z-0">
        <div className="w-1/4 border-r-2 h-full bg-white-smoke py-5">
          <HomeSidebar />
        </div>
        <div className="w-3/4 text-center">
          <div className="w-2/4 mx-auto my-5 border rounded-lg p-5">
            <div className="flex border-b-2 pb-3 justify-between">
              <img
                src="profileImage.jpg"
                alt=""
                className="w-[50px] h-[50px] rounded-full me-5"
              />
              <button className="bg-white-smoke rounded-3xl px-3">
                What's on your mind, Name ?
              </button>
            </div>
            <div className="flex justify-between mt-3">
              <p>Live video</p>
              <p>Photo/video</p>
              <p>Feeling/activity</p>
            </div>
          </div>
          <div>
            <Post />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
