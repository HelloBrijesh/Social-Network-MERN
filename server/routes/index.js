import express from "express";

import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { tokenRefresh } from "../controllers/auth/tokenRefresh";
import { changePassword } from "../controllers/auth/changePassword";
import { verifyEmail, sendEmail } from "../controllers/auth/verifyEmail";
import { getProfile, addProfile } from "../controllers/profile";
import {
  createRequest,
  cancelRequest,
  addFriend,
  friendlist,
  removeFriend,
} from "../controllers/friend";
import { createPost, getAllPost, deletePost } from "../controllers/post";
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

router.get("/post", auth, getAllPost);
router.post("/createpost", auth, createPost);
router.delete("/deletepost", auth, deletePost);

export default router;
