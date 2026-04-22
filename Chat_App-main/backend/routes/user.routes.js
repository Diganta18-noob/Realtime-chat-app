import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, getProfile, updateProfileImage } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.get("/profile", protectRoute, getProfile);
router.put("/profile/image", protectRoute, updateProfileImage);

export default router;
