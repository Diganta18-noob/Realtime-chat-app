import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import isAdmin from "../middleware/isAdmin.js";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";
import {
  getDashboardStats,
  getAllUsers,
  getAuditLogs,
  exportAuditLogs,
  toggleBanUser,
  deleteUser,
} from "../controllers/admin.controller.js";
import { resetPasswordByUsername } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/stats", protectRoute, isAdmin, getDashboardStats);
router.get("/users", protectRoute, isAdmin, getAllUsers);
router.get("/audit-logs/export", protectRoute, isAdmin, exportAuditLogs);
router.get("/audit-logs", protectRoute, isAdmin, getAuditLogs);
router.patch(
  "/users/:id/ban", 
  protectRoute, 
  isAdmin, 
  [
    param("id").isUUID().withMessage("Invalid user ID format"),
    validateRequest
  ], 
  toggleBanUser
);

router.delete(
  "/users/:id", 
  protectRoute, 
  isAdmin, 
  [
    param("id").isUUID().withMessage("Invalid user ID format"),
    validateRequest
  ], 
  deleteUser
);

router.post(
  "/reset-password",
  protectRoute,
  isAdmin,
  [
    body("username").trim().notEmpty().withMessage("Username is required").escape(),
    body("newPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    validateRequest
  ],
  resetPasswordByUsername
);

export default router;
