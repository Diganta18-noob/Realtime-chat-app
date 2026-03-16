---
phase: 3
plan: 2
wave: 1
---

# Plan 3.2: Admin Middleware & Auth Audit Logging

## Objective
Create middleware to restrict admin routes and check banned user status, and integrate audit logging into the existing auth controllers so login/logout events are recorded automatically.

## Context
- .gsd/SPEC.md
- Chat_App-main/backend/middleware/protectRoute.js
- Chat_App-main/backend/controllers/auth.controller.js
- Chat_App-main/backend/models/auditLog.model.js (from Plan 3.1)

## Tasks

<task type="auto">
  <name>Create isAdmin middleware</name>
  <files>Chat_App-main/backend/middleware/isAdmin.js [NEW]</files>
  <action>
    Create middleware that checks `req.user.role === "admin"`.
    If not admin, return `403 { error: "Forbidden — Admin access required" }`.
    This middleware is applied AFTER `protectRoute` on admin-only routes.
  </action>
  <verify>Run `node --check Chat_App-main/backend/middleware/isAdmin.js`.</verify>
  <done>isAdmin middleware exists and returns 403 for non-admin users.</done>
</task>

<task type="auto">
  <name>Create checkBanned middleware</name>
  <files>Chat_App-main/backend/middleware/checkBanned.js [NEW]</files>
  <action>
    Create middleware that checks `req.user.isBanned`.
    If banned, return `403 { error: "Your account has been restricted by an administrator." }`.
    This middleware is applied AFTER `protectRoute` on message routes to block banned users from sending messages.
  </action>
  <verify>Run `node --check Chat_App-main/backend/middleware/checkBanned.js`.</verify>
  <done>checkBanned middleware returns 403 with restricted message for banned users.</done>
</task>

<task type="auto">
  <name>Add audit logging to auth controllers</name>
  <files>Chat_App-main/backend/controllers/auth.controller.js</files>
  <action>
    1. Import `AuditLog` model.
    2. In the `login` controller, after successful authentication:
       - Determine if the user is admin (`user.role === "admin"`).
       - Create an AuditLog entry: `{ userId: user._id, action: user.role === "admin" ? "ADMIN_LOGIN" : "LOGIN", ipAddress: req.ip, userAgent: req.headers["user-agent"] }`.
    3. In the `logout` controller:
       - Extract the user from the refreshToken cookie (if available) and log a `LOGOUT` action.
    4. Include `role` and `isBanned` fields in the login/signup JSON responses so the frontend can use them.
  </action>
  <verify>Run `node --check Chat_App-main/backend/controllers/auth.controller.js`.</verify>
  <done>Login creates an AuditLog entry (LOGIN or ADMIN_LOGIN). Logout logs LOGOUT. Response includes `role` and `isBanned`.</done>
</task>

<task type="auto">
  <name>Wire checkBanned middleware to message routes</name>
  <files>Chat_App-main/backend/routes/message.routes.js</files>
  <action>
    Import `checkBanned` middleware.
    Apply it to the `POST /send/:id` route so banned users cannot send messages:
    ```js
    router.post("/send/:id", protectRoute, checkBanned, sendMessage);
    ```
    The GET route for fetching messages should remain accessible (so banned users can still SEE their existing chats, but not send new ones).
  </action>
  <verify>Run `node --check Chat_App-main/backend/routes/message.routes.js`.</verify>
  <done>Banned users are blocked from sending messages with a 403 error.</done>
</task>

## Success Criteria
- [ ] `isAdmin` middleware rejects non-admin users with 403
- [ ] `checkBanned` middleware rejects banned users from sending messages
- [ ] Login events are recorded in AuditLog (with ADMIN_LOGIN distinction)
- [ ] Auth responses include `role` and `isBanned` fields
