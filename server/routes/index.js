import express from "express";

import { signup } from "../controllers/auth/Signup";
import { login } from "../controllers/auth/Login";
import { tokenRefresh } from "../controllers/auth/TokenRefresh";
import { changePassword } from "../controllers/auth/ChangePassword";
import { verifyEmail, sendEmail } from "../controllers/auth/VerifyEmail";
import { getProfile, addProfile } from "../controllers/Profile";

import {
  createRequest,
  cancelRequest,
  addFriend,
  friendlist,
  removeFriend,
} from "../controllers/Friend";

import { createPost, getPost, deletePost } from "../controllers/Post";

import { auth } from "../middleware";

const router = express.Router();

router.post("/signup", signup, sendEmail);
router.get("/verify/:emailtoken", verifyEmail);
router.post("/login", login);
router.post("/forgotpassword", sendEmail);
router.post("/changepassword", auth, changePassword);
router.get("/tokenrefresh", tokenRefresh);

router.post("/addprofile", auth, addProfile);
router.get("/getprofile", auth, getProfile);

router.get("/friendlist", auth, friendlist);
router.post("/createfriendrequest", auth, createRequest);
router.post("/cancelfriendrequest", auth, cancelRequest);
router.post("/addfriend", auth, addFriend);
router.post("/removefriend", auth, removeFriend);

router.get("/post", auth, getPost);
router.post("/createpost", auth, createPost);
router.delete("/deletepost", auth, deletePost);

export default router;
