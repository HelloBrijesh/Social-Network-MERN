import express from "express";
import {
  signupController,
  loginController,
  emailVerificationController,
  changePasswordController,
  refreshTokenController,
  aboutController,
  friendlistController,
  friendRequestController,
  postController,
} from "../controllers";
import { auth } from "../middleware";

const router = express.Router();

router.post(
  "/signup",
  signupController.signup,
  emailVerificationController.sendEmail
);
router.post("/login", loginController.login);
router.post("/forgotpassword", emailVerificationController.sendEmail);
router.post("/verify/:emailtoken", emailVerificationController.verifyEmail);
router.post("/changepassword", auth, changePasswordController.changePassword);
router.get("/refreshtoken", refreshTokenController.refreshToken);

router.get("/about", auth, aboutController.about);
router.get("/friendlist", auth, friendlistController.friendlist);

router.post(
  "/createfriendrequest",
  auth,
  friendRequestController.createRequest
);
router.post(
  "/cancelfriendrequest",
  auth,
  friendRequestController.cancelRequest
);
router.post("/addfriend", auth, friendRequestController.addRequest);

router.post("/createpost", auth, postController.createPost);
router.post("/deletepost", auth, postController.deletePost);

export default router;
