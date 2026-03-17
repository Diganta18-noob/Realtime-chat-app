import express from "express";
import { getMessage, sendMessage, createGroup, getUnreadCounts } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import checkBanned from "../middleware/checkBanned.js";

const router = express.Router();

router.get("/unread-counts", protectRoute, getUnreadCounts);
router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, checkBanned, sendMessage);
router.post("/group", protectRoute, checkBanned, createGroup);

export default router;
