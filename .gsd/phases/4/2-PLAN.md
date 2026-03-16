---
phase: 4
plan: 2
wave: 2
depends_on: [4.1]
files_modified:
  - Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx
  - Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
  - Chat_App-main/frontend/src/App.jsx
autonomous: true

must_haves:
  truths:
    - "App.jsx routes `/admin` to AdminDashboard within AdminRoute"
    - "Sidebar shows an 'Admin Dashboard' button for admin users"
    - "AdminDashboard displays a table of Users retrieved via useGetUsers"
    - "Ban toggle updates UI optimistically or securely after useToggleBan completes"
  artifacts:
    - "Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx — visually styled with chatdark theme"
---

# Plan 4.2: Admin Dashboard Page & User Management

<objective>
Build the primary Admin Dashboard view. This includes the high-level layout, tab navigation, and the complete User Management table with functional ban/unban toggles. Integrate the dashboard into the main app routing and Sidebar.

Purpose: Provides the visual interface for querying and managing users.
Output: AdminDashboard.jsx page component, updated Sidebar, updated App routing.
</objective>

<context>
Load for context:
- Chat_App-main/frontend/src/App.jsx
- Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
- Chat_App-main/frontend/src/hooks/useGetUsers.js
- Chat_App-main/frontend/src/hooks/useToggleBan.js
</context>

<tasks>

<task type="auto">
  <name>Build AdminDashboard layout and User table</name>
  <files>Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx</files>
  <action>
    Create the main admin page component:
    1. Render a full-screen `glass-card` layout similar to `Home.jsx` but wider.
    2. Add a simple Header with "Admin Dashboard" and a "Back to Chat" button (`<Link to="/">`).
    3. Use `useGetUsers` to fetch data on mount.
    4. Render a DaisyUI `<table className="table table-zebra table-sm">`.
    5. Columns: Avatar, Full Name, Username, Role, Status (Online/Offline), Actions.
    6. For Status: check `user.isOnline`.
    7. For Actions: implement a DaisyUI `<input type="checkbox" className="toggle toggle-error">` wired to `useToggleBan`.
        - If `user.role === "admin"`, disable the toggle.
        - Handle onChange: call `toggleBan`, then update local state.
    AVOID: Building the Audit Logs tab yet — just focus on the User Management view.
  </action>
  <verify>node --check Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx</verify>
  <done>AdminDashboard renders user table with working toggle switches.</done>
</task>

<task type="auto">
  <name>Add /admin route and Sidebar button</name>
  <files>
    Chat_App-main/frontend/src/App.jsx
    Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
  </files>
  <action>
    1. **App.jsx**: 
       Import `AdminDashboard` and `AdminRoute`.
       Add `<Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />`
    
    2. **Sidebar.jsx**:
       Import `useAuthContext`.
       In the Footer section, next to `<LogoutButton />`, add:
       `{authUser?.role === "admin" && <Link to="/admin" className="btn btn-sm btn-ghost"><HiOutlineShieldCheck className="text-xl" /></Link>}`
    AVOID: Breaking existing route protection.
  </action>
  <verify>
    node --check Chat_App-main/frontend/src/App.jsx
    node --check Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
  </verify>
  <done>Admin route mapped in App.jsx and visually accessible from Sidebar for admins.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `node --check` succeeds on all 3 modified files
- [ ] App.jsx contains exactly the `/admin` route wrapped in `AdminRoute`
</verification>

<success_criteria>
- [ ] App loads AdminDashboard at `/admin` safely
- [ ] Users table renders correctly using `useGetUsers` hook
- [ ] Toggles trigger `useToggleBan` and handle disable states for admins
</success_criteria>
