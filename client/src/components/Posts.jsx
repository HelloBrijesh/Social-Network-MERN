import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

const Posts = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [post, setPost] = useState([]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get("https://dummyjson.com/posts")
  //     .then((response) => {
  //       setPost(response.data.posts);
  //     })
  //     .catch((error) => {
  //       setIsError(true);
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   <div>Loading ... </div>;
  // }

  // if (isError) {
  //   <div>Error...</div>;
  // }

  return (
    <div className="bg-white  w-[500px] rounded-lg shadow-lg">
      <div className="flex p-5 justify-between">
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
        <div className="flex gap-3">
          <p>...</p>
          <p>X</p>
        </div>
      </div>
      <div className="mx-5 mb-5">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro
          vero dolorum omnis tempore quos illum molestiae animi nihil delectus.
          Aperiam, error nemo dolore sit vero ducimus sint veniam fugiat.
        </p>
      </div>
      <div>
        <img src="/profileImage.jpg" className="max-h-[500px] w-full" alt="" />
      </div>
      <div className="p-5 flex justify-around">
        <span>Like</span>
        <span>Comment</span>
      </div>
      <hr></hr>
      <div className="flex items-center px-3 py-2 gap-3">
        <img
          src="/profileImage.jpg"
          alt=""
          className="w-[30px] h-[30px] rounded-full"
        />
        <input
          type="text"
          placeholder="Write a comment..."
          className="focus:outline-none font-bolder text-start p-2 bg-white-smoke w-full rounded-3xl text-slate-500"
        />
        <button className="">
          <FontAwesomeIcon icon={faRightToBracket} />
        </button>
      </div>
    </div>
  );
};

export default Posts;
