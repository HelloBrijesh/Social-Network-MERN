import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const Home = () => {
  return (
    <>
      <div className="h-[60px]">
        <Navbar />
      </div>
      <div className="flex">
        <div className="h-screen fixed w-1/6 bg-white-smoke border-r-2">
          <Sidebar />
        </div>
        <div className="w-5/6 text-center mx-auto">
          <div className="w-2/4 mx-auto my-5 border rounded-lg p-5 shadow-md">
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
          <Post />
        </div>
      </div>
    </>
  );
};

export default Home;
