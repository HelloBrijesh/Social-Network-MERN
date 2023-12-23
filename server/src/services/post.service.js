import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

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

const fetchPostsForId = async (userId) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "postedBy",
        select: "firstName lastName profileImage",
      })
      .populate([
        {
          path: "comments",
          populate: {
            path: "commentedBy",
            select: "firstName lastName profileImage",
          },
        },
      ]);
    return posts;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getPostByUserId = async (userId) => {
  try {
    const posts = await Post.find({ postedBy: userId })
      .populate({
        path: "postedBy",
        select: "firstName lastName profileImage",
      })
      .populate([
        {
          path: "comments",
          populate: {
            path: "commentedBy",
            select: "firstName lastName profileImage",
          },
        },
      ]);
    return posts;
  } catch (error) {
    return Promise.reject(error);
  }
};

const likePostById = async (userId, postId) => {
  try {
    const post = await Post.findById(postId);

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

const addCommentToPost = async (userId, postId, commentContent) => {
  try {
    const newComment = new Comment({
      commentContent,
      commentedBy: userId,
    });
    const comment = await newComment.save();

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $push: { comments: comment.id },
      },
      { new: true }
    ).populate([
      {
        path: "comments",
        populate: {
          path: "commentedBy",
          select: "firstName lastName profileImage",
        },
      },
    ]);

    const updatedComments = updatedPost.comments;
    return updatedComments;
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCommentsByPostId = async (postId) => {
  try {
    const post = await Post.findById(postId).populate([
      {
        path: "comments",
        populate: {
          path: "commentedBy",
          select: "firstName lastName profileImage",
        },
      },
    ]);
    const postComments = post.comments;
    return postComments;
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteCommentByPostId = async (postId, commentId) => {
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        $pull: { comments: commentId },
      },
      { new: true }
    ).populate([
      {
        path: "comments",
        populate: {
          path: "commentedBy",
          select: "firstName lastName profileImage",
        },
      },
    ]);

    await Comment.findByIdAndDelete(commentId);

    const postComments = post.comments;
    return postComments;
  } catch (error) {
    return Promise.reject(error);
  }
};
const deletePostById = async (postId) => {
  try {
    const post = await Post.findById(postId);

    const comments = post.comments;

    for (let comment of comments) {
      await Comment.findByIdAndDelete(comment);
    }
    await Post.findByIdAndDelete(postId);
  } catch (error) {
    return Promise.reject(error);
  }
};

export {
  savePost,
  fetchPostsForId,
  likePostById,
  getPostByUserId,
  addCommentToPost,
  getCommentsByPostId,
  deleteCommentByPostId,
  deletePostById,
};
