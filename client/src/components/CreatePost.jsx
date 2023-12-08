const CreatePost = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="fixed shadow-lg inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white w-[500px] flex flex-col rounded-lg">
          <div className="relative text-center p-3">
            <h1 className="text-xl font-bold mb-2">Create Post</h1>
            <button
              onClick={() => onClose()}
              className="absolute right-5 top-3 text-xl font-semibold "
            >
              X
            </button>
          </div>
          <hr></hr>
          <form className="p-5">
            <div className="flex gap-3">
              <img
                src="/profileImage.jpg"
                alt=""
                className="w-[40px] h-[40px] rounded-full"
              />
              <div className="text-sm">
                <p className="font-bold">Brijesh</p>
                <p className="text-slate-500">time</p>
              </div>
            </div>
            <div>
              <textarea
                name=""
                id=""
                cols="20"
                rows="5"
                className="w-full my-3"
                placeholder="What's on your mind, Brijesh ?"
              ></textarea>
            </div>
            <div className="text-center">
              <button className="w-3/5 p-3 bg-blue font-bold text-white text-lg border border-none rounded-lg">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
