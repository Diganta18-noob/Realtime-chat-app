---
phase: 4
plan: 3
wave: 2
depends_on: [4.1, 4.2]
files_modified:
  - Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx
autonomous: true

must_haves:
  truths:
    - "AdminDashboard has tab navigation between 'Users' and 'Audit Logs'"
    - "Audit Logs tab renders a paginated table"
    - "Pagination controls allow navigating through pages"
  artifacts:
    - "Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx — contains tab state and logs table"
---

# Plan 4.3: Audit Logs View & Pagination

<objective>
Enhance the AdminDashboard to include a tabbed interface. Add the "Audit Logs" tab, which renders a table consuming the `useGetAuditLogs` hook and provides functional pagination controls.

Purpose: Completes the Phase 4 UI by exposing the historical security and ban tracking to administrators.
Output: Updated AdminDashboard.jsx supporting multiple views.
</objective>

<context>
Load for context:
- Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx
- Chat_App-main/frontend/src/hooks/useGetAuditLogs.js
</context>

<tasks>

<task type="auto">
  <name>Add Tabs and Audit Logs Table</name>
  <files>Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx</files>
  <action>
    1. Add a local state `activeTab` ("users" or "logs").
    2. Add DaisyUI tabs beneath the Header: `<div role="tablist" className="tabs tabs-boxed">`
    3. Extract the Users table into a conditionally rendered block `if (activeTab === "users")`.
    4. Create the `activeTab === "logs"` block:
       - Call `const { logs, page, totalPages, loading, fetchLogs } = useGetAuditLogs();` (manage page state locally starting at 1).
       - Render table: Timestmap, Action, Performed By (userId.fullName), Target (targetUserId?.fullName), Details, IP Address.
       - Use `new Date(log.createdAt).toLocaleString()` for timestamps.
       - Badge styling for actions (e.g., `LOGIN` = info, `USER_BANNED` = error).
    5. Add DaisyUI `join` pagination controls at the bottom of the Logs table:
       - Prev Button (disabled if page === 1)
       - Page {page} of {totalPages}
       - Next Button (disabled if page === totalPages)
       - Clicking buttons updates the local `page` state, which triggers dependency arrays/fetches in the hook or component.
    AVOID: Over-fetching. Ensure hook dependencies correctly fetch only when `page` changes.
  </action>
  <verify>node --check Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx</verify>
  <done>AdminDashboard renders two tabs. Audit logs display paginated tracking data.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `node --check Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx` succeeds
- [ ] Component contains both `.table` elements for Users and Logs
</verification>

<success_criteria>
- [ ] AdminDashboard effortlessly toggles between Users and Logs tabs
- [ ] Audit logs display with beautifully badged actions
- [ ] Pagination controls work correctly by altering query parameters
</success_criteria>
