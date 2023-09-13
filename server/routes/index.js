import express from "express";
import {
  signupController,
  loginController,
  emailVerificationController,
  changePasswordController,
} from "../controllers";

const router = express.Router();

router.post(
  "/signup",
  signupController.signup,
  emailVerificationController.sendEmail
);
router.post("/login", loginController.login);
router.post("/forgotpassword", emailVerificationController.sendEmail);
router.post("/verify/:emailtoken", emailVerificationController.verifyEmail);
router.post("/changepassword", changePasswordController.changePassword);

export default router;
