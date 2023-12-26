import { useEffect } from "react";
import Post from "./Post";

const Posts = ({ posts, status }) => {
  const isLoading = status === "Loading";
  const error = status === "Error";

  if (isLoading) {
    return <div className="text-center">Loading ... </div>;
  }

  if (error) {
    return <div className="text-center">Error...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center">Yo don&apos;t have any post</div>;
  }

  return (
    <>
      <div className="">
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
