const FriendList = () => {
  return (
    <div className="flex flex-wrap gap-y-14 justify-between w-[700px] h-full">
      <div className="w-[150px] border rounded-lg overflow-hidden shadow-2xl">
        <img src="/profileImage.jpg" alt="" className="w-full h-[150px]" />
        <h1 className="bg-white p-3">Name</h1>
      </div>
    </div>
  );
};

export default FriendList;
