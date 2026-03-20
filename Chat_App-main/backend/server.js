// server.js
// IMPORTANT: config.js MUST be imported first to load .env before any other module
import __dirname from "./config.js";

import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.js";
import { apiLimiter } from "./middleware/rateLimiters.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middleware/errorHandler.js";

import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

// Enforce HTTPS in production
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
});

// Setup Morgan to stream HTTP info directly into Winston structured logs
const morganFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat, {
  stream: { write: message => logger.info(message.trim()) }
}));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(helmet());
app.use(express.json({ limit: "10kb" })); 
app.use(cookieParser());

// Apply global API limiter to all API routes
app.use("/api", apiLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

// Global Error Handler
app.use(errorHandler);

import fs from "fs";

const frontendPath = path.join(__dirname, "frontend", "dist");

if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Graceful fallback for backend-only deployments (like Render split)
  app.get("/", (req, res) => {
    res.status(200).json({ message: "ChatApp Backend API is running." });
  });
}

server.listen(PORT, () => {
  console.log(`Server Running centrally on port ${PORT}`);
});
