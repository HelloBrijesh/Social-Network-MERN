import { Post } from "../models/post";

export const createPost = async (req, res, next) => {
  const userId = req.userId;

  const { content, images } = req.body;

  try {
    const newPost = new Post({
      postedBy: userId,
      postContent: content,
      postImages: images,
    });

    await newPost.save();
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const deletePost = async (req, res, next) => {
  const postId = req.body.postId;

  try {
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    return next(error);
  }

  res.json({ status: "ok" });
};

export const getAllPost = async (req, res, next) => {
  const userId = req.userId;

  let allPost;
  try {
    allPost = await Post.find({ postedBy: userId });
  } catch (error) {
    return next(error);
  }

  res.json({ allPost });
};
