const Photos = () => {
  return (
    <div className="flex flex-wrap justify-start gap-x-6 gap-y-16">
      <div className="shadow-lg rounded-lg overflow-hidden">
        <img src="/profileImage.jpg" alt="" className="w-[150px] h-[150px]" />
      </div>
    </div>
  );
};

export default Photos;
