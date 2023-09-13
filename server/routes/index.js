import express from "express";
import { signupController, loginController } from "../controllers";

const router = express.Router();

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);

export default router;
