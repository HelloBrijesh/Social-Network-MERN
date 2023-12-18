import Post from "../models/post.model.js";
const savePost = async (userId, postContent, postImage) => {
  const newPost = new Post({
    postedBy: userId,
    postContent,
    postImage: postImage,
  });

  try {
    const createdPost = await newPost.save();
    return createdPost;
  } catch (error) {
    return Promise.reject(error);
  }
};

const fetchPostsById = async (userId) => {
  try {
    const posts = await Post.find();
    return posts;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { savePost, fetchPostsById };
