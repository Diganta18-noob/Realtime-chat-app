import express from "express";
import { login, logout, signup, refreshToken, checkUsername } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/check-username/:username", checkUsername);

export default router;
