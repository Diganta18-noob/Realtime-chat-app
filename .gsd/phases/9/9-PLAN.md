---
phase: 9
plan: 1
wave: 1
---

# Plan 9.1: Fix Active Status & Admin Timing

## Objective
Fix the user active status display and enhance the Admin Dashboard to show accurate latest login/logout timestamps for each user.

## Context
- .gsd/SPEC.md
- .gsd/ROADMAP.md
- backend/socket/socket.js
- backend/controllers/admin.controller.js
- frontend/src/pages/admin/AdminDashboard.jsx
- frontend/src/context/SocketContext.jsx

## Tasks

<task type="auto">
  <name>Backend: Fetch Login/Logout Times</name>
  <files>
    backend/controllers/admin.controller.js
  </files>
  <action>
    Update `getAllUsers` to also fetch the most recent `LOGIN` (or `ADMIN_LOGIN`) and `LOGOUT` events from the `AuditLog` collection for each user.
    - Attach `lastLogin` and `lastLogout` timestamps to the user objects in the response.
    - Ensure performance is considered (use aggregation or efficient querying).
  </action>
  <verify>npm run test</verify>
  <done>User objects returned by `/api/admin/users` include `lastLogin` and `lastLogout` fields.</done>
</task>

<task type="auto">
  <name>Frontend: Display Timing on Admin Dashboard</name>
  <files>
    frontend/src/pages/admin/AdminDashboard.jsx
  </files>
  <action>
    Update the "Users" table in the Admin Dashboard to include columns for "Last Login" and "Last Logout".
    - Display the newly provided `lastLogin` and `lastLogout` timestamps from the API.
    - Format dates nicely (e.g., using `new Date().toLocaleString()`).
  </action>
  <verify>npm run test</verify>
  <done>Admin Dashboard Users tab displays the login and logout timings.</done>
</task>

<task type="auto">
  <name>Fix Active Status Bug</name>
  <files>
    backend/socket/socket.js
    frontend/src/context/SocketContext.jsx
    frontend/src/components/sidebar/Conversations.jsx
  </files>
  <action>
    Investigate and fix why the active status isn't showing or syncing perfectly across clients.
    - Ensure disconnected users are properly removed from `userSocketMap`.
    - Ensure frontend stores and consumes `onlineUsers` properly.
    - If the admin user presence shouldn't affect the chat active status (or conversely, admin should see online users), ensure the logic accounts for it.
  </action>
  <verify>npm run test</verify>
  <done>Active status dot appears immediately when a user logs in and disappears when they log out or disconnect.</done>
</task>

## Success Criteria
- [ ] Admin dashboard displays when users logged in and out.
- [ ] Active status indicators correctly reflect the user's connection state in real-time.
