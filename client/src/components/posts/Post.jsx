import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { axiosAuthInstance } from "../../services/api-client";
import { useUserContext } from "../../context/UserContext";
import { useEffect, useState } from "react";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import usePost from "../../hooks/usePost";

const Post = ({ post, removePost, updatePost }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(false);
  const [comment, setComment] = useState(false);
  const [showPostMenu, setShowPostMenu] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [postContent, setPostContent] = useState(post.postContent);
  const [postImage, setPostImage] = useState(post.postImage);
  const { userDetails } = useUserContext();
  const { isLoading, isError, addPostImage, deletePostImage, editPost } =
    usePost();

  useEffect(() => {
    if (post.likes.includes(userDetails.id)) {
      setLike(true);
    }
    setLikeCount(post.likes.length);
  }, []);

  const dateObject = new Date(post.createdAt);
  const options = { day: "numeric", month: "short", year: "numeric" };
  const postDate = dateObject.toLocaleDateString("en-US", options);
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: false };
  const postTime = dateObject.toLocaleTimeString("en-US", optionsTime);

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
      removePost(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = async () => {
    const editedPost = await editPost(post.id, postContent, postImage);
    updatePost(post.id, postContent, postImage);
    setIsEditPost(false);
  };

  return (
    <div className="bg-white relative mx-auto mb-5 md:w-[500px] rounded-lg shadow-lg">
      <div className="flex px-4 py-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <Modal
            isOpen={isEditPost}
            onClose={async () => {
              setIsEditPost(false);
            }}
          >
            <div className="bg-white m-5 w-[500px] flex flex-col rounded-lg">
              <h1 className="text-xl text-center font-bold mt-3 mb-5">
                Edit Post
              </h1>
              <div>
                <div className="flex gap-3">
                  <div className="">
                    {userDetails.profileImage === "" ? (
                      <FontAwesomeIcon
                        icon={faUser}
                        className="w-[20px] h-[20px] bg-white-smoke p-3 rounded-full border-white border-4"
                      />
                    ) : (
                      <img
                        src={`${userDetails.profileImage}`}
                        alt=""
                        className="w-[50px] h-[50px] rounded-full border-white border-4"
                      />
                    )}
                  </div>
                  <div className="text-sm">
                    <Link to={`/${userDetails.id}/profile/`}>
                      <p className="font-bold">
                        {userDetails.firstName} {userDetails.lastName}
                      </p>
                    </Link>
                    <p className="text-slate-500">time</p>
                  </div>
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="20"
                    rows="5"
                    className="w-full my-3 p-2 focus:outline-none focus:ring-1 border-gray-400 border rounded-md focus:ring-gray-400"
                    placeholder={`What's on your mind, ${userDetails.firstName} ?`}
                    onChange={(e) => setPostContent(e.target.value)}
                    value={postContent}
                  ></textarea>
                </div>
                <div>
                  {postImage !== "" && (
                    <div className="flex flex-col w-[200px] max-h-[200px]">
                      <button
                        onClick={async () => {
                          await deletePostImage(postImage);
                          setPostImage("");
                        }}
                        className=" self-end relative top-[25px] bg-slate-700 text-white px-2 py-0.4"
                      >
                        X
                      </button>
                      <img src={`${postImage}`} alt="" className="border" />
                    </div>
                  )}
                </div>
                <div className="flex justify-between py-5 px-3 mb-5 border rounded-lg">
                  <p className="">Add to your Edited post</p>
                  <button className="w-auto">
                    <input
                      id="editBookImage"
                      className="hidden border-0"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={async (e) =>
                        setPostImage(await addPostImage(e, postImage))
                      }
                    />
                    <label
                      className="flex items-center cursor-pointer text-base rounded-lg"
                      htmlFor="editBookImage"
                    >
                      <FontAwesomeIcon icon={faImage} className="text-2xl" />
                    </label>
                  </button>
                </div>
                <div className="text-center">
                  <button
                    onClick={handleEditPost}
                    disabled={!postContent && !postImage}
                    className="w-full p-3 disabled:opacity-50 bg-blue font-bold text-white text-lg border border-none rounded-lg"
                  >
                    Edit Post
                  </button>
                </div>
              </div>
            </div>
          </Modal>

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
            <Link to={`/${post.postedBy.id}/profile/`}>
              <p className="font-bold">
                {post.postedBy.firstName} {post.postedBy.lastName}
              </p>
            </Link>
            <p className="text-slate-500">
              {postDate} {postTime}
            </p>
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
                setIsEditPost(true);
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
