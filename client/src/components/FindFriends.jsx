const FindFriends = () => {
  return (
    <div className="w-[600px] flex flex-col gap-y-10 items-center">
      <div className="">
        <div className="text-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter text to search"
            className="my-3 border rounded-lg p-3 focus:outline-none"
          />
          <button className="ms-5 bg-blue py-3 px-8 text-white rounded-xl">
            Search
          </button>
        </div>
      </div>
      <div className="w-[500px] flex justify-between items-center gap-5 p-5 bg-white rounded-lg shadow-xl ">
        <div className=" flex items-center gap-5 ">
          <img
            src="/profileImage.jpg"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <h1 className="">Name</h1>
        </div>
        <div className="flex gap-3">
          <p className="text-blue font-bold">Send Request</p>
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
