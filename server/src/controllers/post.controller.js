import { savePost, fetchPostsById } from "../services/post.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { getUserById } from "../services/user.service.js";
const createPost = async (req, res, next) => {
  const userId = req.userId;
  const { postContent, postImage } = req.body;
  try {
    const createdPost = await savePost(userId, postContent, postImage);
    return res
      .status(201)
      .json(new ApiResponse(200, createdPost, "Post Created"));
  } catch (error) {
    console.log(error.message);
    return next(ApiError.serverError("Something went Wrong"));
  }
};

const getPost = async (req, res, next) => {
  const userId = req.userId;
  console.log("Post", userId);
  try {
    const posts = await fetchPostsById(userId);
    console.log(posts);
    return res.status(201).json(new ApiResponse(200, posts, "Posts"));
  } catch (error) {
    return next(ApiError.serverError("Something went Wrong"));
  }
};

export { createPost, getPost };
