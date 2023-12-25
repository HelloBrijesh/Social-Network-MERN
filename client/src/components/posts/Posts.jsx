import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import Post from "./Post";
const Posts = () => {
  const [status, setStatus] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setStatus("Loading");
    axiosAuthInstance
      .get("/users/posts")
      .then((response) => {
        setPosts(response.data.data);
        setStatus("Success");
      })
      .catch((error) => {
        setStatus("Error");
      });
  }, []);
  const isLoading = status === "Loading";
  const error = status === "Error";

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  if (posts.length === 0) {
    return <div>Yo don&apos;t have any post</div>;
  }

  return (
    <>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Post {...post}></Post>
          </div>
        ))}
      </div>
    </>
  );
};

export default Posts;
