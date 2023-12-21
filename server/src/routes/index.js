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
  changePassword,
  updateUserCoverImage,
  updateUserProfileImage,
  deleteUserCoverImage,
  deleteUserProfileImage,
} from "../controllers/user.controller.js";
import {
  createPost,
  getPost,
  likePost,
  addPostComment,
  getPostComments,
  deleteComment,
} from "../controllers/post.controller.js";
import {
  getFriends,
  unFriend,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  cancelFriendRequest,
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
router.put("/users", auth, updateUser);
router.put("/users/change-password", auth, changePassword);
router.put("/users/cover-image", auth, updateUserCoverImage);
router.delete("/users/cover-image", auth, deleteUserCoverImage);
router.put("/users/profile-image", auth, updateUserProfileImage);
router.delete("/users/profile-image", auth, deleteUserProfileImage);

router.post("/users/posts", auth, createPost);
router.get("/users/posts", auth, getPost);
router.put("/users/posts/:postId/like", auth, likePost);
router.post("/users/posts/:postId/comment", auth, addPostComment);
router.get("/users/posts/:postId/comments", auth, getPostComments);
router.delete("/users/posts/:postId/comments/:commentId", auth, deleteComment);

router.get("/users/friends", auth, getFriends);
router.delete("/users/friends/remove", auth, unFriend);
router.post("/users/friends/send-request", auth, sendFriendRequest);
router.delete("/users/friends/remove-request", auth, cancelFriendRequest);
router.post("/users/friends/accept-request", auth, acceptFriendRequest);
router.post("/users/friends/reject-request", auth, rejectFriendRequest);

export default router;
