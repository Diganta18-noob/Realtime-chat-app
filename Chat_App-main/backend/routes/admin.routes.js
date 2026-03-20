import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import isAdmin from "../middleware/isAdmin.js";
import { param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";
import {
  getDashboardStats,
  getAllUsers,
  getAuditLogs,
  exportAuditLogs,
  toggleBanUser,
  deleteUser,
} from "../controllers/admin.controller.js";

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

export default router;
