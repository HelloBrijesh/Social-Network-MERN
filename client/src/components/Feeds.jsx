import Post from "./Post";
const Feeds = () => {
  return (
    <>
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
    </>
  );
};

export default Feeds;
