import Post from "./Post";
import { useState, useEffect, useRef, useCallback } from "react";
import { axiosAuthInstance } from "../../services/api-client";

const Posts = () => {
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);

  const LIMIT = 5;

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
      <div className="">
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
    </>
  );
};

export default Posts;
