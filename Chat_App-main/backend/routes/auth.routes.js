import express from "express";
import rateLimit from "express-rate-limit";
import { loginLimiter, signupLimiter } from "../middleware/rateLimiters.js";
import { login, logout, signup, refreshToken, checkUsername, getMe, verifyEmail, forgotPassword, resetPassword, googleAuth, setUsername } from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";

const router = express.Router();

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 5,
  skip: (req, res) => process.env.NODE_ENV === "development",
  message: { error: "Too many requests, please try again later." },
});

router.post(
  "/signup", 
  signupLimiter, 
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required").escape(),
    body("username").trim().notEmpty().withMessage("Username is required").isLength({ min: 3 }).escape(),
    body("email").optional({ values: 'falsy' }).isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("confirmPassword").exists(),
    body("gender").isIn(["male", "female"]).withMessage("Invalid gender"),
    validateRequest
  ],
  signup
);

router.post(
  "/login", 
  loginLimiter,
  [
    body("username").trim().notEmpty().withMessage("Username is required").escape(),
    body("password").notEmpty().withMessage("Password is required"),
    validateRequest
  ], 
  login
);

router.post("/logout", logout);
router.post("/refresh", refreshToken);

router.get(
  "/check-username/:username", 
  [
    param("username").trim().notEmpty().escape(),
    validateRequest
  ],
  checkUsername
);

router.get("/me", protectRoute, getMe);

router.put(
  "/set-username",
  protectRoute,
  [
    body("newUsername").trim().notEmpty().withMessage("Username is required").isLength({ min: 3 }).escape(),
    validateRequest
  ],
  setUsername
);

router.post(
  "/verify-email", 
  [
    body("token").trim().notEmpty().withMessage("Token is required").escape(),
    validateRequest
  ],
  verifyEmail
);

router.post(
  "/forgot-password", 
  strictLimiter, 
  [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    validateRequest
  ],
  forgotPassword
);

router.post(
  "/reset-password", 
  strictLimiter, 
  [
    body("token").trim().notEmpty().withMessage("Token is required").escape(),
    body("newPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    validateRequest
  ],
  resetPassword
);

router.post(
  "/google",
  [
    body("token").trim().notEmpty().withMessage("Google token is required"),
    validateRequest
  ],
  googleAuth
);

export default router;
