import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  savePost,
  fetchPostsById,
  likePostById,
  addCommentToPost,
  getCommentsByPostId,
  deleteCommentByPostId,
} from "../services/post.service.js";

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
  try {
    const posts = await fetchPostsById(userId);
    return res.status(201).json(new ApiResponse(200, posts, "Posts"));
  } catch (error) {
    return next(ApiError.serverError("Something went Wrong"));
  }
};

const likePost = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.params.postId;
  try {
    const updatedPost = await likePostById(userId, postId);
    return res
      .status(201)
      .json(new ApiResponse(200, updatedPost, "Posts Like updated"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};

const addPostComment = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const { commentContent } = req.body;

  try {
    const updatedComments = await addCommentToPost(
      userId,
      postId,
      commentContent
    );

    return res.status(201).json(new ApiResponse(200, updatedComments, "Posts"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};

const getPostComments = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.params.postId;

  try {
    const postComments = await getCommentsByPostId(postId);
    return res.status(201).json(new ApiResponse(200, postComments, "Posts"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};

const deleteComment = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const updatedComments = await deleteCommentByPostId(postId, commentId);
    return res.status(201).json(new ApiResponse(200, updatedComments, "Posts"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};

export {
  createPost,
  getPost,
  likePost,
  addPostComment,
  getPostComments,
  deleteComment,
};
