---
phase: 3
plan: 3
wave: 2
---

# Plan 3.3: Admin API Routes & Controllers

## Objective
Create the admin-only API routes and controllers that power the Admin Dashboard: list all users (with ban status & online status), view audit logs, and toggle ban/unban on users.

## Context
- .gsd/SPEC.md
- Chat_App-main/backend/middleware/protectRoute.js
- Chat_App-main/backend/middleware/isAdmin.js (from Plan 3.2)
- Chat_App-main/backend/models/user.model.js
- Chat_App-main/backend/models/auditLog.model.js (from Plan 3.1)
- Chat_App-main/backend/socket/socket.js

## Tasks

<task type="auto">
  <name>Create admin controller</name>
  <files>Chat_App-main/backend/controllers/admin.controller.js [NEW]</files>
  <action>
    Create an admin controller with the following functions:

    1. `getAllUsers` — Fetch ALL users (excluding passwords), including `role`, `isBanned`, `createdAt`.
       Also include online status by reading the `userSocketMap` from socket.js.
    2. `getAuditLogs` — Fetch audit logs, optionally filtered by `?userId=xxx` or `?action=LOGIN`.
       Populate `userId` and `targetUserId` with `fullName` and `username`.
       Support pagination via `?page=1&limit=50` (default 50 per page, newest first).
    3. `toggleBanUser` — Given a user ID in `req.params.id`:
       - Find the user, toggle their `isBanned` field.
       - Create an AuditLog entry: `{ userId: req.user._id, action: isBanned ? "USER_BANNED" : "USER_UNBANNED", targetUserId: user._id }`.
       - If the user is now banned and currently online (check userSocketMap), emit a `"banned"` event to their socket and disconnect them.
       - Return the updated user.
  </action>
  <verify>Run `node --check Chat_App-main/backend/controllers/admin.controller.js`.</verify>
  <done>Admin controller has getAllUsers, getAuditLogs, and toggleBanUser functions.</done>
</task>

<task type="auto">
  <name>Create admin routes and wire into server.js</name>
  <files>
    Chat_App-main/backend/routes/admin.routes.js [NEW]
    Chat_App-main/backend/server.js
  </files>
  <action>
    1. Create `admin.routes.js`:
       ```js
       import express from "express";
       import protectRoute from "../middleware/protectRoute.js";
       import isAdmin from "../middleware/isAdmin.js";
       import { getAllUsers, getAuditLogs, toggleBanUser } from "../controllers/admin.controller.js";

       const router = express.Router();

       router.get("/users", protectRoute, isAdmin, getAllUsers);
       router.get("/audit-logs", protectRoute, isAdmin, getAuditLogs);
       router.patch("/users/:id/ban", protectRoute, isAdmin, toggleBanUser);

       export default router;
       ```
    2. In `server.js`, import and mount the admin routes:
       ```js
       import adminRoutes from "./routes/admin.routes.js";
       app.use("/api/admin", adminRoutes);
       ```
  </action>
  <verify>Run `node --check Chat_App-main/backend/server.js` and `node --check Chat_App-main/backend/routes/admin.routes.js`.</verify>
  <done>Admin routes are mounted at `/api/admin/*` with protectRoute + isAdmin middleware.</done>
</task>

<task type="auto">
  <name>Export userSocketMap from socket.js</name>
  <files>Chat_App-main/backend/socket/socket.js</files>
  <action>
    Export `userSocketMap` so the admin controller can check which users are currently online.
    Update the existing export line:
    ```js
    export { app, io, server, userSocketMap };
    ```
  </action>
  <verify>Run `node --check Chat_App-main/backend/socket/socket.js`.</verify>
  <done>userSocketMap is exported and accessible from admin controller.</done>
</task>

## Success Criteria
- [ ] `GET /api/admin/users` returns all users with online status and ban info
- [ ] `GET /api/admin/audit-logs` returns paginated audit logs
- [ ] `PATCH /api/admin/users/:id/ban` toggles ban status and logs the action
- [ ] Banned online users receive a "banned" socket event and are disconnected
- [ ] All admin routes are protected by `protectRoute` + `isAdmin`
