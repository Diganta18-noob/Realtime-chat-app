---
phase: 10
plan: 1
wave: 1
---

# Plan 10.1: Admin Dashboard Stats Bar

## Objective
Add a stats bar at the top of the Admin Dashboard showing three key metrics: **Total Users**, **Online Now**, and **Messages Today**. This provides admins with instant situational awareness without needing to scroll through tables.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- Chat_App-main/backend/controllers/admin.controller.js
- Chat_App-main/backend/routes/admin.routes.js
- Chat_App-main/backend/models/message.model.js
- Chat_App-main/backend/models/user.model.js
- Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx
- Chat_App-main/frontend/src/hooks/useGetUsers.js

## Tasks

<task type="auto">
  <name>Create backend stats endpoint</name>
  <files>Chat_App-main/backend/controllers/admin.controller.js, Chat_App-main/backend/routes/admin.routes.js</files>
  <action>
    Add a new `getDashboardStats` controller function in `admin.controller.js`:
    1. Count total users: `User.countDocuments()`
    2. Count online users: count keys in `userSocketMap` from `socket.js`
    3. Count messages today: `Message.countDocuments({ createdAt: { $gte: startOfToday } })` — compute `startOfToday` as `new Date().setHours(0,0,0,0)`
    4. Return JSON: `{ totalUsers, onlineNow, messagesToday }`

    Register the route in `admin.routes.js`:
    ```
    router.get("/stats", protectRoute, isAdmin, getDashboardStats);
    ```

    WHY: Keep it as a single lightweight GET to avoid multiple round-trips.
  </action>
  <verify>curl or fetch `/api/admin/stats` returns { totalUsers: number, onlineNow: number, messagesToday: number }</verify>
  <done>GET /api/admin/stats returns all three numeric fields correctly</done>
</task>

<task type="auto">
  <name>Add Stats Bar UI to AdminDashboard</name>
  <files>Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx</files>
  <action>
    1. Create a new hook `useGetDashboardStats.js` in `frontend/src/hooks/` — fetches `/api/admin/stats` with auth headers and token refresh logic (mirror the pattern in `useGetAuditLogs.js`).
    2. In `AdminDashboard.jsx`, import the hook and render a stats bar between the header and tabs:
       - 3 cards in a horizontal flex row: "Total Users" (👥 icon), "Online Now" (🟢 icon), "Messages Today" (💬 icon)
       - Each card: `bg-base-200/50 rounded-lg border border-base-300 p-4 text-center`
       - Value in large bold font (`text-2xl font-bold gradient-text`), label below in muted text
       - Use a loading skeleton while the data is being fetched
    3. Do NOT use any external chart library for this — just simple stat cards.

    WHY: Stats bar is the highest-visibility quick win and gives admins immediate context.
  </action>
  <verify>Open Admin Dashboard in browser — three stat cards visible at the top with correct data</verify>
  <done>Stats bar renders with dynamic data from the backend; loading state displays skeletons</done>
</task>

## Success Criteria
- [ ] `GET /api/admin/stats` endpoint returns `totalUsers`, `onlineNow`, `messagesToday`
- [ ] Admin Dashboard displays a stats bar with 3 cards above the tab content
- [ ] Stats bar shows loading skeleton while fetching
- [ ] Values update on page refresh
