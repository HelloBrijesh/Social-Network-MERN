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
import { getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.post("/auth/signup", signup);
router.get("/auth/verify-email", verifyEmail);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/auth/refresh", tokenRefresh);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password", resetPassword);

router.get("/users", auth, getUser);

export default router;
