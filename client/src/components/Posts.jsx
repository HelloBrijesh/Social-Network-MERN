import { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://dummyjson.com/posts")
      .then((response) => {
        setPost(response.data.posts);
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
    <div>Loading ... </div>;
  }

  if (isError) {
    <div>Error...</div>;
  }

  return (
    <div>
      <div>
        {post.map((p) => (
          <li key={p}>{p.id}</li>
        ))}
      </div>
    </div>
  );
};

export default Posts;
