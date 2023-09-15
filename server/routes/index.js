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
router.get("/verify/:emailtoken", emailVerificationController.verifyEmail);
router.post("/changepassword", auth, changePasswordController.changePassword);
router.get("/refreshtoken", refreshTokenController.refreshToken);

router.post("/addprofiledetail", auth, aboutController.addProfileDetails);
router.get("/getprofiledetail", auth, aboutController.getProfileDetail);
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
router.post("/addfriend", auth, friendRequestController.addFriend);

router.get("/post", auth, postController.getPost);
router.post("/createpost", auth, postController.createPost);
router.delete("/deletepost", auth, postController.deletePost);

export default router;
