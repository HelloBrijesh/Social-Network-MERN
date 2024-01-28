import Post from "./Post";
import { useState, useEffect, useRef, useCallback } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import { useUserContext } from "../../context/UserContext";
import usePost from "../../hooks/usePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal";
import { Link } from "react-router-dom";

const Posts = () => {
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");

  const LIMIT = 5;
  const { userDetails } = useUserContext();
  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (status === "Loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNext) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [status, hasNext]
  );

  const {
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    addPostImage,
    deletePostImage,
    createPost,
  } = usePost();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    axiosAuthInstance
      .get(`/users/posts?page=${page}&limit=${LIMIT}`)
      .then((response) => {
        setPosts((prev) => [...prev, ...response.data.data]);
        setHasNext(response.data.data.length > 0);
      })
      .catch((error) => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  const handleCreatePost = async () => {
    const post = await createPost(postContent, postImage);
    if (post) {
      setPosts((prev) => [post, ...prev]);
      setPostContent("");
      setPostImage("");
      setIsModalOpen(false);
    }
  };
  const removePost = (postId) => {
    setPosts(() => {
      return posts.filter((post) => postId !== post.id);
    });
  };

  const updatePost = (postId, postContent, postImage) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          post.postContent = postContent;
          post.postImage = postImage;
        }
        return post;
      })
    );
  };

  return (
    <>
      <div className="flex flex-col items-center gap-y-5">
        <div className="w-full md:w-[500px] bg-white rounded-lg shadow-lg mx-5">
          <div className="flex gap-3 m-3 items-center">
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
                  className="w-[60px] h-[50px] rounded-full border-white border-4"
                />
              )}
            </div>

            <button
              onClick={() => {
                setIsModalOpen(true);
              }}
              className="font-bolder text-start p-3 bg-white-smoke w-full rounded-3xl text-slate-500"
            >
              What&apos;s on your mind, {userDetails?.firstName} ?{" "}
            </button>
          </div>
          <hr className="mx-3"></hr>
          <div className="flex justify-around font-bold text-slate-600 py-3">
            <span>Live Video</span>
            <span>Photo/video</span>
            <span>Felling/Activity</span>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={async () => {
            await deletePostImage(postImage);
            setPostImage("");
            setPostContent("");
            setIsModalOpen(false);
          }}
        >
          <div className="bg-white m-5 w-[500px] flex flex-col rounded-lg">
            <h1 className="text-base text-center md:text-xl font-bold mb-6">
              Create Post
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
                  <Link to={`${userDetails.id}/profile/`}>
                    <p className="font-bold">
                      {userDetails.firstName} {userDetails.lastName}
                    </p>
                  </Link>
                  {/* <p className="text-slate-500">time</p> */}
                </div>
              </div>
              <div className="">
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
                        setPostImage(await deletePostImage(postImage));
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
                <p className="hidden md:block">Add to your post</p>

                <button className="w-auto">
                  <input
                    id="bookImage"
                    className="hidden border-0"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={async (e) =>
                      setPostImage(await addPostImage(e, postImage))
                    }
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
        </Modal>
        <div className="w-full">
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div key={post.id} ref={lastPostElementRef}>
                  <Post
                    post={post}
                    removePost={removePost}
                    updatePost={updatePost}
                  ></Post>
                </div>
              );
            } else {
              return (
                <div key={post.id}>
                  <Post
                    post={post}
                    removePost={removePost}
                    updatePost={updatePost}
                  ></Post>
                </div>
              );
            }
          })}
          {isLoading && <p className="font-semibold text-center">Loading...</p>}

          {!isLoading && posts.length === 0 && (
            <div className="text-center">Yo don&apos;t have any post</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Posts;
