import Post from "./Post";
import { useState, useEffect, useRef, useCallback } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import CreatePost from "../posts/CreatePost";
import { useUserContext } from "../../context/UserContext";
import usePost from "../../hooks/usePost";

const Posts = () => {
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [showCreatePost, setCreatePost] = useState(false);

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

  useEffect(() => {
    axiosAuthInstance
      .get(`/users/posts?page=${page}&limit=${LIMIT}`)
      .then((response) => {
        setPosts((prev) => [...prev, ...response.data.data]);
        setStatus("Success");
        setHasNext(response.data.data.length > 0);
        setIsCreated(false);
      })
      .catch((error) => {
        setStatus("Error");
      });
  }, [page]);

  const isLoading = status === "Loading";
  const error = status === "Error";

  if (posts.length === 0) {
    return <div className="text-center">Yo don&apos;t have any post</div>;
  }

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
                setCreatePost(true);
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
        <CreatePost
          isVisible={showCreatePost}
          onClose={() => {
            setCreatePost(false);
            window.location.reload(false);
          }}
        ></CreatePost>
        <div className="w-full">
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div key={post.id} ref={lastPostElementRef}>
                  <Post {...post}></Post>
                </div>
              );
            } else {
              return (
                <div key={post.id}>
                  <Post {...post}></Post>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Posts;
