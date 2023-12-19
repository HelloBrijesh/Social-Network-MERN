import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../services/api-client";
import Post from "./Post";
const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axiosAuthInstance
      .get("/users/posts")
      .then((response) => {
        console.log(response.data.data);
        setPosts(response.data.data);
      })
      .catch((error) => {
        setIsError(true);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading ... </div>;
  }

  if (isError) {
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
