import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import checkBanned from "../middleware/checkBanned.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage);
router.post("/send/:id", protectRoute, checkBanned, sendMessage);

export default router;
