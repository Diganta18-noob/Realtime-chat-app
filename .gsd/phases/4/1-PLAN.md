---
phase: 4
plan: 1
wave: 1
depends_on: []
files_modified:
  - Chat_App-main/frontend/src/components/AdminRoute.jsx
  - Chat_App-main/frontend/src/hooks/useGetUsers.js
  - Chat_App-main/frontend/src/hooks/useGetAuditLogs.js
  - Chat_App-main/frontend/src/hooks/useToggleBan.js
  - Chat_App-main/frontend/src/context/SocketContext.jsx
autonomous: true

must_haves:
  truths:
    - "AdminRoute component redirects non-admin users to `/`"
    - "AdminRoute component renders children if `authUser.role === 'admin'`"
    - "Three admin hooks correctly fetch from `/api/admin/*` using Bearer tokens and 401 retries"
    - "SocketContext listens for 'banned' event and forces logout"
  artifacts:
    - "Chat_App-main/frontend/src/components/AdminRoute.jsx — built"
    - "Chat_App-main/frontend/src/hooks/useGetUsers.js — built"
    - "Chat_App-main/frontend/src/hooks/useGetAuditLogs.js — built"
    - "Chat_App-main/frontend/src/hooks/useToggleBan.js — built"
---

# Plan 4.1: Admin Auth & API Hooks

<objective>
Create the frontend foundation for the Admin Dashboard: a higher-order component to protect admin routes, three custom hooks to interact with the Phase 3 backend APIs, and socket integration to handle live bans.

Purpose: Isolate the data fetching and security layers so the UI components can be built purely for presentation in Wave 2.
Output: AdminRoute.jsx, three hooks, and an updated SocketContext.
</objective>

<context>
Load for context:
- Chat_App-main/frontend/src/hooks/useGetMessages.js (for Bearer token refresh reference)
- Chat_App-main/frontend/src/context/SocketContext.jsx
- Chat_App-main/frontend/src/context/AuthContext.jsx
</context>

<tasks>

<task type="auto">
  <name>Create AdminRoute wrapper component</name>
  <files>Chat_App-main/frontend/src/components/AdminRoute.jsx</files>
  <action>
    Create a component that wraps children for admin-only access:
    ```jsx
    import { Navigate } from "react-router-dom";
    import { useAuthContext } from "../context/AuthContext";

    const AdminRoute = ({ children }) => {
      const { authUser } = useAuthContext();
      if (!authUser) return <Navigate to="/login" replace />;
      if (authUser.role !== "admin") return <Navigate to="/" replace />;
      return children;
    };
    export default AdminRoute;
    ```
    AVOID: Complex loading states here — assume `authUser` is synchronously available from local storage/context on mount.
  </action>
  <verify>node --check Chat_App-main/frontend/src/components/AdminRoute.jsx</verify>
  <done>AdminRoute component exists and safely gates non-admins.</done>
</task>

<task type="auto">
  <name>Create Admin API Data Hooks</name>
  <files>
    Chat_App-main/frontend/src/hooks/useGetUsers.js
    Chat_App-main/frontend/src/hooks/useGetAuditLogs.js
    Chat_App-main/frontend/src/hooks/useToggleBan.js
  </files>
  <action>
    Create three hooks mimicking the `useGetMessages` pattern (including `refreshAccessToken` on 401).

    **useGetUsers**:
    - state: `users` (array), `loading` (boolean)
    - `fetch("/api/admin/users", { headers: { Authorization: "Bearer " + token }})`
    - Returns `{ users, setUsers, loading }`

    **useGetAuditLogs**:
    - state: `logs` (array), `total`, `page`, `totalPages`, `loading`
    - Accepts `page` param. `fetch("/api/admin/audit-logs?page=" + page)`
    - Returns `{ logs, total, totalPages, loading, fetchLogs }`

    **useToggleBan**:
    - state: `loading`
    - `fetch("/api/admin/users/" + userId + "/ban", { method: "PATCH" })`
    - Shows `toast.success` or `toast.error`.
    - Returns `{ loading, toggleBan }`
  </action>
  <verify>
    node --check Chat_App-main/frontend/src/hooks/useGetUsers.js
    node --check Chat_App-main/frontend/src/hooks/useGetAuditLogs.js
    node --check Chat_App-main/frontend/src/hooks/useToggleBan.js
  </verify>
  <done>Three hooks exist, implement the 401 retry pattern, and handle loading states.</done>
</task>

<task type="auto">
  <name>Wire "banned" socket event to force logout</name>
  <files>Chat_App-main/frontend/src/context/SocketContext.jsx</files>
  <action>
    In the `useEffect` where `newSocket` is configured, add a listener:
    ```jsx
    newSocket.on("banned", (data) => {
      // Show error toast
      import("react-hot-toast").then((module) => {
        module.default.error(data.message || "You have been banned.", { duration: 5000 });
      });
      // Force logout
      setAuthUser(null);
      setAccessToken(null);
      localStorage.removeItem("chat-user");
    });
    ```
    AVOID: Creating circular dependencies with hooks. Dispatch the logout directly using Context setters. Dynamic import for toast prevents top-level import issues if any exist.
  </action>
  <verify>node --check Chat_App-main/frontend/src/context/SocketContext.jsx</verify>
  <done>SocketContext forces logout and clears context when a "banned" event is received.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `node --check` succeeds on all 5 modified files
- [ ] `AdminRoute.jsx` uses `useAuthContext()` and `<Navigate />`
- [ ] All three hooks implement the `refreshAccessToken` pattern for 401 errors
</verification>

<success_criteria>
- [ ] UI routing is protected by `AdminRoute`
- [ ] Admin API calls handle token rotation securely
- [ ] Live bans log the target user out instantly across open tabs
</success_criteria>
