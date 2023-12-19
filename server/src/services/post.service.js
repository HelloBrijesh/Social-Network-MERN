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
    const posts = await Post.find().populate({
      path: "postedBy",
      select: "firstName lastName profileImage",
    });
    return posts;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    return Promise.reject(error);
  }
};

const likePostById = async (userId, postId) => {
  try {
    const post = await getPostById(postId);

    let updatedpost;

    if (!post.likes.includes(userId)) {
      updatedpost = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: userId },
        },
        {
          new: true,
        }
      );
    }

    if (post.likes.includes(userId)) {
      updatedpost = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: userId },
        },
        {
          new: true,
        }
      );
    }

    return updatedpost;
  } catch (error) {
    return Promise.reject(error);
  }
};

export { savePost, fetchPostsById, likePostById, getPostById };
