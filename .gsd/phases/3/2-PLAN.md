---
phase: 3
plan: 2
wave: 1
depends_on: [3.1]
files_modified:
  - Chat_App-main/backend/middleware/isAdmin.js
  - Chat_App-main/backend/middleware/checkBanned.js
  - Chat_App-main/backend/controllers/auth.controller.js
  - Chat_App-main/backend/routes/message.routes.js
autonomous: true
user_setup: []

must_haves:
  truths:
    - "isAdmin middleware rejects non-admin users with 403 and error message"
    - "checkBanned middleware rejects banned users from POST /send/:id with 403"
    - "Login creates an AuditLog entry (LOGIN or ADMIN_LOGIN based on role)"
    - "Logout creates a LOGOUT AuditLog entry when user is identifiable"
    - "Auth responses (login + signup) include `role` and `isBanned` fields"
    - "Banned users are blocked from sending messages but can still read their chats"
  artifacts:
    - "Chat_App-main/backend/middleware/isAdmin.js — new file"
    - "Chat_App-main/backend/middleware/checkBanned.js — new file"
    - "Chat_App-main/backend/routes/message.routes.js — POST /send/:id uses checkBanned"
---

# Plan 3.2: Admin Middleware & Auth Audit Logging

<objective>
Create two new middleware files (isAdmin, checkBanned) and integrate AuditLog captures into the existing auth controllers so login/logout events are automatically tracked. Wire checkBanned into message routes to enforce the ban policy.

Purpose: Provides the security layer and event tracking for admin features without changing core business logic.
Output: Two new middleware files, updated auth controller and message route.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- Chat_App-main/backend/middleware/protectRoute.js
- Chat_App-main/backend/controllers/auth.controller.js
- Chat_App-main/backend/routes/message.routes.js
- Chat_App-main/backend/models/auditLog.model.js (from Plan 3.1)
</context>

<tasks>

<task type="auto">
  <name>Create isAdmin middleware</name>
  <files>Chat_App-main/backend/middleware/isAdmin.js</files>
  <action>
    Create middleware that checks `req.user.role === "admin"`.
    If the user is not admin, return `res.status(403).json({ error: "Forbidden — Admin access required" })`.
    If admin, call `next()`.
    This middleware MUST be applied AFTER `protectRoute` (which populates `req.user`).

    ```js
    const isAdmin = (req, res, next) => {
      if (req.user?.role !== "admin") {
        return res.status(403).json({ error: "Forbidden — Admin access required" });
      }
      next();
    };

    export default isAdmin;
    ```
    AVOID: making this middleware async or doing any DB calls — role is already on req.user from protectRoute.
  </action>
  <verify>node --check Chat_App-main/backend/middleware/isAdmin.js</verify>
  <done>isAdmin.js exists, passes syntax check, and returns 403 for non-admin users.</done>
</task>

<task type="auto">
  <name>Create checkBanned middleware</name>
  <files>Chat_App-main/backend/middleware/checkBanned.js</files>
  <action>
    Create middleware that checks `req.user.isBanned`.
    If banned, return `res.status(403).json({ error: "Your account has been restricted by an administrator." })`.
    If not banned, call `next()`.

    ```js
    const checkBanned = (req, res, next) => {
      if (req.user?.isBanned) {
        return res.status(403).json({ error: "Your account has been restricted by an administrator." });
      }
      next();
    };

    export default checkBanned;
    ```
    AVOID: DB calls — isBanned is already on req.user from protectRoute.
  </action>
  <verify>node --check Chat_App-main/backend/middleware/checkBanned.js</verify>
  <done>checkBanned.js exists, passes syntax check, returns 403 with the exact restricted message for banned users.</done>
</task>

<task type="auto">
  <name>Add audit logging to auth controllers and expose role/isBanned in responses</name>
  <files>Chat_App-main/backend/controllers/auth.controller.js</files>
  <action>
    1. Import AuditLog at the top: `import AuditLog from "../models/auditLog.model.js";`

    2. In the `login` controller, AFTER the user is found and password verified:
       - Create an audit log entry (fire-and-forget with `.catch` to avoid crashing on log failure):
       ```js
       AuditLog.create({
         userId: user._id,
         action: user.role === "admin" ? "ADMIN_LOGIN" : "LOGIN",
         ipAddress: req.ip,
         userAgent: req.headers["user-agent"],
       }).catch(console.error);
       ```

    3. In the `logout` controller, log LOGOUT if the user can be identified from the refreshToken cookie:
       - Decode the refresh token, find the userId, create: `{ userId, action: "LOGOUT", ipAddress: req.ip, userAgent: req.headers["user-agent"] }`
       - Wrap in try/catch to avoid blocking logout on log failure.

    4. In the `login` AND `signup` JSON response, include `role` and `isBanned`:
       ```js
       res.status(200).json({
         _id: user._id,
         fullName: user.fullName,
         username: user.username,
         profilePic: user.profilePic,
         role: user.role,
         isBanned: user.isBanned,
       });
       ```
    AVOID: awaiting the AuditLog.create() in login — it should be fire-and-forget so a log failure never breaks auth.
  </action>
  <verify>node --check Chat_App-main/backend/controllers/auth.controller.js</verify>
  <done>Login creates AuditLog (LOGIN or ADMIN_LOGIN). Logout logs LOGOUT. Auth responses include `role` and `isBanned`.</done>
</task>

<task type="auto">
  <name>Wire checkBanned middleware to message send route</name>
  <files>Chat_App-main/backend/routes/message.routes.js</files>
  <action>
    Import `checkBanned` middleware at the top:
    ```js
    import checkBanned from "../middleware/checkBanned.js";
    ```
    Apply it ONLY to the POST send route (not GET fetch):
    ```js
    router.post("/send/:id", protectRoute, checkBanned, sendMessage);
    ```
    The GET route (`router.get("/:id", protectRoute, getMessages)`) must remain unchanged — banned users can still read their existing chats.
    AVOID: applying checkBanned to the GET route — per spec, banned users should see their chats but not send new ones.
  </action>
  <verify>node --check Chat_App-main/backend/routes/message.routes.js</verify>
  <done>POST /send/:id chain is: protectRoute → checkBanned → sendMessage. GET route is unchanged.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `node --check Chat_App-main/backend/middleware/isAdmin.js` succeeds
- [ ] `node --check Chat_App-main/backend/middleware/checkBanned.js` succeeds
- [ ] `node --check Chat_App-main/backend/controllers/auth.controller.js` succeeds
- [ ] `node --check Chat_App-main/backend/routes/message.routes.js` succeeds
- [ ] message.routes.js POST /send/:id includes `checkBanned` in middleware chain
- [ ] auth.controller.js imports AuditLog and creates log entries on login/logout
</verification>

<success_criteria>
- [ ] isAdmin middleware rejects non-admin users with 403
- [ ] checkBanned middleware rejects banned users from sending messages with 403
- [ ] Login events are recorded in AuditLog (ADMIN_LOGIN for admins, LOGIN for users)
- [ ] Auth responses (login + signup) include `role` and `isBanned` fields
</success_criteria>
