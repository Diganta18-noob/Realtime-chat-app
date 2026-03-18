import express from "express";
import rateLimit from "express-rate-limit";
import { login, logout, signup, refreshToken, checkUsername, getMe } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 20,
  skipSuccessfulRequests: true,
  skip: (req, res) => process.env.NODE_ENV === "development",
  message: { error: "Too many failed attempts, please try again after 15 minutes." },
});

router.post("/signup", authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/logout", logout);
router.post("/refresh", refreshToken);
router.get("/check-username/:username", checkUsername);
router.get("/me", protectRoute, getMe);

export default router;
