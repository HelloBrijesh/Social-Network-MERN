import { useEffect, useState } from "react";
import { axiosAuthInstance } from "../../services/api-client";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import Post from "../posts/Post";

const Timeline = () => {
  let { userId } = useParams();

  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus("Loading");
    axiosAuthInstance
      .get(`/users/${userId}/posts`)
      .then((response) => {
        setPosts(response.data.data);
        setStatus("Success");
      })
      .catch((error) => {
        setStatus("Error");
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {posts.length === 0 && <p className=" font-semibold">No Posts</p>}

      {posts.map((post) => (
        <Post key={post.id} {...post}></Post>
      ))}
    </div>
  );
};

export default Timeline;
