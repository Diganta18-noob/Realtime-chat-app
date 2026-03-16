---
phase: 3
plan: 3
wave: 2
depends_on: [3.1, 3.2]
files_modified:
  - Chat_App-main/backend/controllers/admin.controller.js
  - Chat_App-main/backend/routes/admin.routes.js
  - Chat_App-main/backend/server.js
  - Chat_App-main/backend/socket/socket.js
autonomous: true
user_setup: []

must_haves:
  truths:
    - "GET /api/admin/users returns all users with isOnline status and isBanned flag"
    - "GET /api/admin/audit-logs returns paginated logs with populated userId/targetUserId"
    - "PATCH /api/admin/users/:id/ban toggles isBanned and creates AuditLog entry"
    - "Admins cannot be banned (toggleBanUser returns 400 for admin targets)"
    - "Banned + online users receive a 'banned' socket event and are disconnected after 500ms"
    - "All /api/admin/* routes require protectRoute + isAdmin middleware"
    - "userSocketMap is exported from socket.js so admin controller can check online status"
  artifacts:
    - "Chat_App-main/backend/controllers/admin.controller.js — new file with 3 exports"
    - "Chat_App-main/backend/routes/admin.routes.js — new file with 3 routes"
    - "Chat_App-main/backend/server.js — admin routes mounted at /api/admin"
    - "Chat_App-main/backend/socket/socket.js — userSocketMap exported"
  key_links:
    - "admin.controller.js imports userSocketMap + io from socket.js"
    - "admin.routes.js imports protectRoute, isAdmin, and all 3 controller exports"
    - "server.js mounts adminRoutes before the app.listen() call"
---

# Plan 3.3: Admin API Routes & Controllers

<objective>
Create the admin-only API controller and routes that power the Admin Dashboard: list all users (with ban status & online status), view paginated audit logs, and toggle ban/unban on users. Wire the socket.js map export so online status is always live.

Purpose: This completes the backend surface for Phase 3. Phase 4 (frontend) will consume these endpoints.
Output: admin.controller.js, admin.routes.js, updated server.js and socket.js.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- Chat_App-main/backend/middleware/protectRoute.js
- Chat_App-main/backend/middleware/isAdmin.js (from Plan 3.2)
- Chat_App-main/backend/models/user.model.js
- Chat_App-main/backend/models/auditLog.model.js (from Plan 3.1)
- Chat_App-main/backend/socket/socket.js
- Chat_App-main/backend/server.js
</context>

<tasks>

<task type="auto">
  <name>Export userSocketMap from socket.js</name>
  <files>Chat_App-main/backend/socket/socket.js</files>
  <action>
    Find the existing export line in socket.js (currently likely `export { app, io, server }`) and add `userSocketMap` to it:
    ```js
    export { app, io, server, userSocketMap };
    ```
    Also ensure `getReceiverSocketId` is exported if the admin controller needs it:
    ```js
    export const getReceiverSocketId = (userId) => userSocketMap[userId];
    ```
    AVOID: restructuring socket.js — only touch the export statement and add getReceiverSocketId if it doesn't already exist.
  </action>
  <verify>node --check Chat_App-main/backend/socket/socket.js</verify>
  <done>socket.js exports userSocketMap (and getReceiverSocketId). Syntax check passes.</done>
</task>

<task type="auto">
  <name>Create admin controller with getAllUsers, getAuditLogs, toggleBanUser</name>
  <files>Chat_App-main/backend/controllers/admin.controller.js</files>
  <action>
    Create the controller with these three exported async functions:

    **getAllUsers**: `User.find().select("-password").sort({ createdAt: -1 })`, then map each user to add `isOnline: !!userSocketMap[user._id.toString()]`. Return 200 with the array.

    **getAuditLogs**: Accept `?userId`, `?action`, `?page=1`, `?limit=50` query params. Build a filter object, skip by `(page-1)*limit`. Run:
    - `AuditLog.find(filter).populate("userId", "fullName username profilePic").populate("targetUserId", "fullName username profilePic").sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit))`
    - `AuditLog.countDocuments(filter)` in parallel with Promise.all.
    Return `{ logs, total, page, totalPages }`.

    **toggleBanUser**: Find user by `req.params.id`. If not found → 404. If `user.role === "admin"` → 400 (cannot ban admins). Toggle `user.isBanned`. Save. Create AuditLog `{ userId: req.user._id, action: user.isBanned ? "USER_BANNED" : "USER_UNBANNED", targetUserId: user._id, ipAddress: req.ip, userAgent: req.headers["user-agent"], details: "..." }`. If newly banned and user is online (`userSocketMap[user._id.toString()]`), emit `io.to(socketId).emit("banned", { message: "..." })` then `setTimeout(() => socket.disconnect(true), 500)`. Return updated user.

    Imports needed: User, AuditLog from models; { userSocketMap, io, getReceiverSocketId } from socket.js.

    AVOID: exposing password field in any response.
    AVOID: allowing admins to be banned — the `user.role === "admin"` guard is the only safeguard.
  </action>
  <verify>node --check Chat_App-main/backend/controllers/admin.controller.js</verify>
  <done>admin.controller.js exports getAllUsers, getAuditLogs, toggleBanUser. Syntax check passes.</done>
</task>

<task type="auto">
  <name>Create admin routes and mount in server.js</name>
  <files>
    Chat_App-main/backend/routes/admin.routes.js
    Chat_App-main/backend/server.js
  </files>
  <action>
    **admin.routes.js** — Create with:
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

    **server.js** — Add AFTER existing route imports but BEFORE `app.listen()`:
    ```js
    import adminRoutes from "./routes/admin.routes.js";
    app.use("/api/admin", adminRoutes);
    ```
    AVOID: mounting `/api/admin` before the existing auth/message routes — order shouldn't matter here but keep it grouped with other api routes.
  </action>
  <verify>
    node --check Chat_App-main/backend/routes/admin.routes.js
    node --check Chat_App-main/backend/server.js
  </verify>
  <done>admin.routes.js has 3 routes all behind protectRoute+isAdmin. server.js mounts /api/admin. Both pass syntax check.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `node --check Chat_App-main/backend/controllers/admin.controller.js` succeeds
- [ ] `node --check Chat_App-main/backend/routes/admin.routes.js` succeeds
- [ ] `node --check Chat_App-main/backend/server.js` succeeds
- [ ] `node --check Chat_App-main/backend/socket/socket.js` succeeds
- [ ] server.js contains `app.use("/api/admin", adminRoutes)`
- [ ] admin.routes.js has GET /users, GET /audit-logs, PATCH /users/:id/ban
</verification>

<success_criteria>
- [ ] GET /api/admin/users returns all users with online status and ban info (admin only)
- [ ] GET /api/admin/audit-logs returns paginated, populated audit logs (admin only)
- [ ] PATCH /api/admin/users/:id/ban toggles ban, logs action, disconnects online banned users
- [ ] Admins cannot be banned (400 returned)
- [ ] All admin routes protected by protectRoute + isAdmin
- [ ] userSocketMap exported from socket.js for online status detection
</success_criteria>
