---
phase: 10
plan: 3
wave: 2
---

# Plan 10.3: Ban/Suspend Duration Options

## Objective
Upgrade the existing ban toggle to support **suspend durations** (1 hour, 24 hours, permanent). Currently the toggle is a simple boolean flip. This plan adds a duration selector and backend logic to auto-unban after the suspend period expires.

## Context
- Chat_App-main/backend/controllers/admin.controller.js (toggleBanUser)
- Chat_App-main/backend/models/user.model.js
- Chat_App-main/backend/models/auditLog.model.js
- Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx
- Chat_App-main/frontend/src/hooks/useToggleBan.js

## Tasks

<task type="auto">
  <name>Add suspend duration to User model and ban endpoint</name>
  <files>Chat_App-main/backend/models/user.model.js, Chat_App-main/backend/controllers/admin.controller.js</files>
  <action>
    1. In `user.model.js`, add two new fields to the schema:
       ```js
       bannedUntil: { type: Date, default: null },
       banReason: { type: String, default: "" },
       ```

    2. In `admin.controller.js`, update `toggleBanUser`:
       - Accept `{ duration, reason }` from `req.body`
       - `duration` can be: "1h", "24h", "permanent", or "unban"
       - If banning:
         - Set `user.isBanned = true`
         - If `duration === "permanent"`, set `user.bannedUntil = null` (null means permanent)
         - If `duration === "1h"`, set `user.bannedUntil = new Date(Date.now() + 3600000)`
         - If `duration === "24h"`, set `user.bannedUntil = new Date(Date.now() + 86400000)`
         - Set `user.banReason = reason || ""`
       - If unbanning (`duration === "unban"` or toggle off):
         - Set `user.isBanned = false`, `user.bannedUntil = null`, `user.banReason = ""`
       - Include `bannedUntil` and `banReason` in the audit log details string

    3. Add a middleware check OR update the existing message-send middleware:
       - Before blocking a banned user, check if `user.bannedUntil` is set and has passed — if so, auto-unban the user (set `isBanned = false`, `bannedUntil = null`) and allow the action
       - This is a lazy/on-demand approach — no cron job needed

    WHY: Duration-based suspension avoids the need for admins to manually remember to unban users.
    WHY lazy check instead of cron: Simpler, no extra infrastructure, and perfectly adequate for this scale.
  </action>
  <verify>
    1. Ban a user with duration "1h" → user.bannedUntil is ~1 hour in the future
    2. Ban a user with "permanent" → user.bannedUntil is null, user.isBanned is true
    3. Unban → all fields reset
  </verify>
  <done>
    User model has bannedUntil and banReason fields.
    toggleBanUser endpoint accepts duration and reason.
    Lazy auto-unban check works in message middleware.
  </done>
</task>

<task type="auto">
  <name>Add suspend UI to AdminDashboard Users tab</name>
  <files>Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx, Chat_App-main/frontend/src/hooks/useToggleBan.js</files>
  <action>
    1. Replace the simple toggle checkbox with a more expressive control:
       - If user is NOT banned: show a "Suspend" button (btn btn-error btn-xs)
       - If user IS banned: show "Unban" button (btn btn-success btn-xs) + display remaining time or "Permanent"

    2. When "Suspend" is clicked, show a small dropdown/modal with:
       - Duration options: "1 Hour", "24 Hours", "Permanent" (radio buttons or select)
       - Reason text input (optional, input-bordered input-sm)
       - "Confirm" button (btn btn-error btn-sm)
       - "Cancel" link

    3. Update `useToggleBan.js`:
       - Accept `{ duration, reason }` as body payload in the PATCH request
       - Pass it to the backend endpoint

    4. In the users table, add a new "Ban Expires" column (or show it inline):
       - If `bannedUntil` is set, show relative time (e.g., "in 45 min")
       - If user is permanently banned, show "Permanent"
       - If user is not banned, show "-"

    Style: Use DaisyUI modal (`dialog` element) or a dropdown for the suspend form.

    WHY: Moving from toggle to explicit suspend flow prevents accidental bans and lets admins provide reasons.
  </action>
  <verify>
    Open Admin Dashboard > Users tab.
    Click "Suspend" on a user → see duration/reason form.
    Select "1 Hour" + type reason → click Confirm → user shows "Banned" with countdown.
    Click "Unban" → user returns to active.
  </verify>
  <done>
    Suspend button opens duration/reason form.
    Users table shows ban expiry info.
    Unban button resets all ban fields.
  </done>
</task>

## Success Criteria
- [ ] User model has `bannedUntil` and `banReason` fields
- [ ] Ban endpoint accepts `duration` (1h/24h/permanent) and `reason`
- [ ] Auto-unban logic triggers when a banned user's `bannedUntil` has passed
- [ ] Frontend shows Suspend/Unban buttons instead of a bare toggle
- [ ] Suspend flow includes duration picker and optional reason
- [ ] Users table displays ban expiry time or "Permanent"
