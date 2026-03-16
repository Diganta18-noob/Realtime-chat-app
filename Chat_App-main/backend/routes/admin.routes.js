import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import isAdmin from "../middleware/isAdmin.js";
import {
  getAllUsers,
  getAuditLogs,
  toggleBanUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/users", protectRoute, isAdmin, getAllUsers);
router.get("/audit-logs", protectRoute, isAdmin, getAuditLogs);
router.patch("/users/:id/ban", protectRoute, isAdmin, toggleBanUser);

export default router;
