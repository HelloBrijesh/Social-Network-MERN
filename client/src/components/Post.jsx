import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { axiosAuthInstance } from "../services/api-client";
import { useUserContext } from "../context/UserContext";
import { useEffect, useState } from "react";

const Post = (post) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const { userDetails } = useUserContext();

  useEffect(() => {
    if (post.likes.includes(userDetails.id)) {
      setLike(true);
    }
    setLikeCount(post.likes.length);
  }, []);

  const handleLike = async (postId) => {
    try {
      const response = await axiosAuthInstance.put(
        `/users/posts/${postId}/like`,
        {}
      );
      if (response.data.data.likes.includes(userDetails.id)) {
        setLike(true);
        setLikeCount(likeCount + 1);
      } else {
        setLike(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white mb-5 w-[500px] rounded-lg shadow-lg">
      <div className="flex px-4 py-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="">
            {post.postedBy.profileImage === "" ? (
              <FontAwesomeIcon
                icon={faUser}
                className="w-[20px] h-[20px] p-3 bg-white-smoke rounded-full border-white border-4"
              />
            ) : (
              <img
                src={`${post.postedBy.profileImage}`}
                alt=""
                className="w-[50px] h-[50px] rounded-full border-white border-4"
              />
            )}
          </div>
          <div className="text-sm">
            <p className="font-bold">
              {post.postedBy.firstName} {post.postedBy.lastName}
            </p>
            <p className="text-slate-500">time</p>
          </div>
        </div>
        <div className="flex gap-5">
          <p>...</p>
          <p>X</p>
        </div>
      </div>
      <hr></hr>
      <div className="mx-5 my-3 mb-5">
        <p>{post.postContent}</p>
      </div>
      {post.postImage !== "" && (
        <div>
          <img
            src={`${post.postImage}`}
            className="max-h-[500px] w-full"
            alt=""
          />
        </div>
      )}
      <hr></hr>
      <div className="p-5 flex justify-around">
        <button
          className={`${like ? "text-blue" : ""}`}
          onClick={() => handleLike(post.id)}
        >
          Like {likeCount}
        </button>
        <button>Comment</button>
      </div>
      <hr></hr>
      <div className="flex items-center px-2 py-2 gap-3">
        <div className="">
          {userDetails.profileImage === "" ? (
            <FontAwesomeIcon
              icon={faUser}
              className="w-[20px] h-[20px] p-3 bg-white-smoke rounded-full border-white border-4"
            />
          ) : (
            <img
              src={`${userDetails.profileImage}`}
              alt=""
              className="w-[60px] h-[50px] rounded-full border-white border-4"
            />
          )}
        </div>
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

export default Post;
