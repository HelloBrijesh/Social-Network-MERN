import express from "express";
import {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/auth/signup", signup);
router.get("/auth/verify-email", verifyEmail);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", auth, resetPassword);
router.post("/auth/login", login);
router.delete("/auth/logout", logout);

router.post("/users", auth, getUser);

export default router;
