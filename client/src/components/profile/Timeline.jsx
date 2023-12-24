import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import { useParams } from "react-router-dom";
import Post from "../posts/Post";
const Timeline = () => {
  const [posts, setPosts] = useState([]);

  let { userId } = useParams();

  useEffect(() => {
    axiosAuthInstance
      .get(`/users/${userId}/posts`)
      .then((response) => {
        setPosts(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-5">
      {posts.length === 0 && <p className="font-semibold">No Posts</p>}

      {posts.map((post) => (
        <Post key={post.id} {...post}></Post>
      ))}
    </div>
  );
};

export default Timeline;
