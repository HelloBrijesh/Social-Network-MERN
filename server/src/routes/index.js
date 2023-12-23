import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  tokenRefresh,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import {
  getUser,
  updateUser,
  getProfile,
  changePassword,
  updateUserCoverImage,
  updateUserProfileImage,
  deleteUserCoverImage,
  deleteUserProfileImage,
} from "../controllers/user.controller.js";
import {
  createPost,
  getPostsForUser,
  likePost,
  addPostComment,
  getPostComments,
  deleteComment,
  getPostsOfUser,
  deletePost,
} from "../controllers/post.controller.js";
import {
  getFriends,
  getFriendsOfUser,
  unFriend,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
  getUsersListForFriends,
} from "../controllers/friend.controller.js";
const router = express.Router();

router.post("/auth/signup", signup);
router.get("/auth/verify-email", verifyEmail);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/refresh", tokenRefresh);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

router.get("/users", auth, getUser);
router.get("/users/:userId/profile-details", auth, getProfile);
router.get("/users/:userId/posts", auth, getPostsOfUser);
router.get("/users/:userId/friends", auth, getFriendsOfUser);

router.put("/users", auth, updateUser);
router.put("/users/change-password", auth, changePassword);
router.put("/users/cover-image", auth, updateUserCoverImage);
router.delete("/users/cover-image", auth, deleteUserCoverImage);
router.put("/users/profile-image", auth, updateUserProfileImage);
router.delete("/users/profile-image", auth, deleteUserProfileImage);

router.post("/users/posts", auth, createPost);
router.get("/users/posts", auth, getPostsForUser);
router.put("/users/posts/:postId/like", auth, likePost);
router.post("/users/posts/:postId/comment", auth, addPostComment);
router.get("/users/posts/:postId/comments", auth, getPostComments);
router.delete("/users/posts/:postId/comments/:commentId", auth, deleteComment);
router.delete("/users/posts/:postId", auth, deletePost);

router.get("/users/find-friends", auth, getUsersListForFriends);
router.get("/users/friends", auth, getFriends);
router.delete("/users/friends/:userIdOfFriend", auth, unFriend);
router.post("/users/friends/send-request", auth, sendFriendRequest);
router.post("/users/friends/remove-request", auth, cancelFriendRequest);
router.post("/users/friends/accept-request", auth, acceptFriendRequest);
router.post("/users/friends/reject-request", auth, rejectFriendRequest);

export default router;
