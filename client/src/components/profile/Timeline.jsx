import { useParams } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import Post from "../posts/Post";

const Timeline = () => {
  let { userId } = useParams();

  const LIMIT = 5;

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

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
    setIsLoading(true);
    setIsError(false);
    axiosAuthInstance
      .get(`/users/${userId}/posts?page=${page}&limit=${LIMIT}`)
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center font-semibold">
        Loading....
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-red-500 flex justify-center items-center font-semibold">
        Error
      </div>
    );
  }

  if (posts.length === 0) {
    return <div className="text-center font-semibold">No post</div>;
  }

  return (
    <div className="mx-6">
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
    </div>
  );
};

export default Timeline;
