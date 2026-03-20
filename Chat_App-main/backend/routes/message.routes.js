import express from "express";
import { getMessage, sendMessage, createGroup, getUnreadCounts } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import checkBanned from "../middleware/checkBanned.js";

import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validate.js";

const router = express.Router();

router.get("/unread-counts", protectRoute, getUnreadCounts);
router.get(
  "/:id", 
  protectRoute, 
  [
    param("id").isUUID().withMessage("Invalid ID format"),
    validateRequest
  ], 
  getMessage
);

router.post(
  "/send/:id", 
  protectRoute, 
  checkBanned, 
  [
    param("id").isUUID().withMessage("Invalid receiver ID format"),
    body("message").trim().notEmpty().withMessage("Message cannot be empty").escape(), // Neutralizes XSS via HTML encoding
    validateRequest
  ], 
  sendMessage
);

router.post(
  "/group", 
  protectRoute, 
  checkBanned, 
  [
    body("name").trim().notEmpty().withMessage("Group name is required").escape(),
    body("participants").isArray({ min: 1 }).withMessage("Participants must be an array of UUIDs"),
    body("participants.*").isUUID().withMessage("Each participant must be a valid UUID"),
    validateRequest
  ], 
  createGroup
);

export default router;
