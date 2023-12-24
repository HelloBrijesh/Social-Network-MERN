import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { axiosAuthInstance } from "../../services/api-client";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { Link, Navigate } from "react-router-dom";
import EditPost from "./EditPost";

const Post = (post) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [comment, setComment] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const { userDetails } = useUserContext();
  const [showEditPost, setShowEditPost] = useState(false);

  useEffect(() => {
    if (post.likes.includes(userDetails.id)) {
      setLike(true);
    }
    setLikeCount(post.likes.length);
  }, []);

  const handleLike = async () => {
    try {
      const response = await axiosAuthInstance.put(
        `/users/posts/${post.id}/like`,
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

  const handleDeletePost = async (postId) => {
    try {
      const response = await axiosAuthInstance.delete(`/users/posts/${postId}`);
      setShowPostMenu(!showPostMenu);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditPost = async (postId) => {
    console.log(postId);
  };

  return (
    <div className="bg-white relative mb-5 w-[500px] rounded-lg shadow-lg">
      <div className="flex px-4 py-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <EditPost
            isVisible={showEditPost}
            onClose={() => setShowEditPost(false)}
            post={post}
          ></EditPost>

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
            <Link to={`${post.postedBy.id}/profile/`}>
              <p className="font-bold">
                {post.postedBy.firstName} {post.postedBy.lastName}
              </p>
            </Link>
            <p className="text-slate-500">time</p>
          </div>
        </div>

        <button
          disabled={userDetails.id !== post.postedBy.id}
          className=""
          onClick={() => setShowPostMenu(!showPostMenu)}
        >
          ...
        </button>
        {showPostMenu && (
          <div className="absolute bg-white top-[65px] right-0 border">
            <button
              className="py-2 px-3 w-full h-full hover:font-semibold"
              onClick={() => {
                setShowEditPost(true);
                setShowPostMenu(!showPostMenu);
              }}
            >
              Edit Post
            </button>
            <hr></hr>
            <button
              className="py-2 px-3 w-full h-full hover:font-semibold"
              onClick={() => handleDeletePost(post.id)}
            >
              Delete Post
            </button>
          </div>
        )}
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
        <button className={`${like ? "text-blue" : ""}`} onClick={handleLike}>
          Like {likeCount}
        </button>
        <button onClick={() => setComment((prev) => !prev)}>Comment</button>
      </div>

      {comment && (
        <div>
          <Comments postId={post.id}></Comments>
        </div>
      )}
    </div>
  );
};

export default Post;
