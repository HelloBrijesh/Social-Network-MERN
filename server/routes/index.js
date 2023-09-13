import express from "express";
import {
  signupController,
  loginController,
  emailVerificationController,
  changePasswordController,
  refreshTokenController,
  aboutController,
} from "../controllers";
import { auth } from "../middleware";
import friendlistController from "../controllers/profile/friendlistController";

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

export default router;
