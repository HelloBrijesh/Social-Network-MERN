import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  savePost,
  editPostById,
  fetchPostsForId,
  likePostById,
  addCommentToPost,
  getCommentsByPostId,
  deleteCommentByPostId,
  getPostByUserId,
  deletePostById,
} from "../services/post.service.js";

const createPost = async (req, res, next) => {
  const userId = req.userId;
  const postImage = req.body.postImage;
  let postContent = req.body.postContent;

  if (!postContent && postImage) {
    postContent = " ";
  }

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

const editPost = async (req, res, next) => {
  const userId = req.userId;
  const { postId } = req.params;
  const postImage = req.body.postImage;
  let postContent = req.body.postContent;

  if (!postContent && postImage) {
    postContent = " ";
  }
  try {
    const editedPost = await editPostById(postId, postContent, postImage);
    return res
      .status(201)
      .json(new ApiResponse(200, editedPost, "Post Edited"));
  } catch (error) {
    return next(ApiError.serverError("Something went Wrong"));
  }
};

const getPostsForUser = async (req, res, next) => {
  const userId = req.userId;
  try {
    const posts = await fetchPostsForId(userId);
    return res.status(201).json(new ApiResponse(200, posts, "Posts"));
  } catch (error) {
    return next(ApiError.serverError("Something went Wrong"));
  }
};

const getPostsOfUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const posts = await getPostByUserId(userId);
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
    return res
      .status(201)
      .json(new ApiResponse(200, updatedComments, "Comment Deleted"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};

const deletePost = async (req, res, next) => {
  const userId = req.userId;
  const postId = req.params.postId;

  try {
    await deletePostById(postId);
    return res.status(201).json(new ApiResponse(200, "", "Posts Deleted"));
  } catch (error) {
    return next(ApiError.serverError("Something went wrong"));
  }
};
export {
  createPost,
  editPost,
  getPostsForUser,
  getPostsOfUser,
  likePost,
  addPostComment,
  getPostComments,
  deleteComment,
  deletePost,
};
