import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../../context/UserContext";
import usePost from "../../hooks/usePost";
import { useState } from "react";
import { Link } from "react-router-dom";

const CreatePost = ({ isVisible, onClose }) => {
  const [postContent, setPostContent] = useState("");

  const { userDetails } = useUserContext();
  const {
    isLoading,
    error,
    postImage,
    addPostImage,
    deletePostImage,
    createPost,
  } = usePost();

  const handlePostImage = async (e) => {
    await addPostImage(e);
  };
  const deleteImage = async () => {
    await deletePostImage();
  };

  const handleCreatePost = async () => {
    await createPost(postContent);
    onClose();
  };

  const handleCloseCreatePost = async () => {
    await deletePostImage();
    onClose();
  };
  if (!isVisible) return null;

  if (isLoading) {
    return <p>{isLoading}</p>;
  }

  if (error) {
    return <p>Something Went wrong</p>;
  }

  return (
    <>
      <div className="fixed z-20 shadow-lg inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white mx-5 w-[500px] flex flex-col rounded-lg">
          <div className="relative text-center p-3">
            <h1 className="text-base md:text-xl font-bold mb-2">Create Post</h1>
            <button
              onClick={handleCloseCreatePost}
              className="absolute right-5 top-3 text-xl font-semibold "
            >
              X
            </button>
          </div>
          <hr></hr>
          <div className="p-5">
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
                <Link to={`${userDetails.id}/profile/`}>
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
                className="w-full my-3 focus:outline-none focus:ring-1 focus:ring-gray-600"
                placeholder={`What's on your mind, ${userDetails.firstName} ?`}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div>
              {postImage !== "" && (
                <div className="flex flex-col w-[200px] max-h-[200px]">
                  <button
                    onClick={deleteImage}
                    className=" self-end relative top-[25px] bg-slate-700 text-white px-2 py-0.4"
                  >
                    X
                  </button>
                  <img src={`${postImage}`} alt="" className="border" />
                </div>
              )}
            </div>
            <div className="flex justify-between py-5 px-3 mb-5 border rounded-lg">
              <p className="hidden md:block">Add to your post</p>

              <button className="w-auto">
                <input
                  id="bookImage"
                  className="hidden border-0"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handlePostImage}
                />
                <label
                  className="flex items-center cursor-pointer text-base rounded-lg"
                  htmlFor="bookImage"
                >
                  <FontAwesomeIcon icon={faImage} className="text-2xl" />
                </label>
              </button>
            </div>
            <div className="text-center">
              <button
                onClick={handleCreatePost}
                disabled={!postContent && !postImage}
                className="w-full p-3 disabled:opacity-50 bg-blue font-bold text-white text-lg border border-none rounded-lg"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
