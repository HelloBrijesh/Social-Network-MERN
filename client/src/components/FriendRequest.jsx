const FriendRequest = () => {
  return (
    <div className="flex flex-col gap-y-10 h-full">
      <div className="w-[500px] h-full flex justify-between items-center gap-5 p-5 bg-white rounded-lg shadow-xl ">
        <div className=" flex items-center gap-5 ">
          <img
            src="/profileImage.jpg"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <h1 className="">Name</h1>
        </div>
        <div className="flex gap-3">
          <button className=" bg-green-500 text-white px-3 py-2">Accept</button>
          <button className=" bg-red-500 text-white px-3 py-2">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
