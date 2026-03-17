---
phase: 10
plan: 2
wave: 1
---

# Plan 10.2: Audit Log Filters & CSV Export

## Objective
Enhance the Audit Logs tab with filter controls (action type, user search, date range) and a CSV export button. The backend already supports `userId` and `action` query params — this plan adds **date range** filtering on the backend and builds the full filter UI + export on the frontend.

## Context
- Chat_App-main/backend/controllers/admin.controller.js (getAuditLogs)
- Chat_App-main/backend/models/auditLog.model.js
- Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx
- Chat_App-main/frontend/src/hooks/useGetAuditLogs.js

## Tasks

<task type="auto">
  <name>Extend backend audit log query with date range</name>
  <files>Chat_App-main/backend/controllers/admin.controller.js</files>
  <action>
    In the `getAuditLogs` function:
    1. Extract `startDate` and `endDate` from `req.query`
    2. Build a `createdAt` filter:
       ```js
       if (startDate || endDate) {
         filter.createdAt = {};
         if (startDate) filter.createdAt.$gte = new Date(startDate);
         if (endDate) filter.createdAt.$lte = new Date(endDate);
       }
       ```
    3. Add a new route for CSV export: create `exportAuditLogs` controller that:
       - Accepts the same filters (action, userId, startDate, endDate) but no pagination
       - Queries all matching logs (limit 10000 for safety)
       - Returns a CSV string with headers: Timestamp, Action, User, Target, IP, Details
       - Sets `Content-Type: text/csv` and `Content-Disposition: attachment; filename=audit_logs.csv`
    4. Register: `router.get("/audit-logs/export", protectRoute, isAdmin, exportAuditLogs);`
       - IMPORTANT: Register this BEFORE the existing `/audit-logs` route so Express matches it first

    WHY: The backend already partially supports filtering; we just need date range + CSV.
  </action>
  <verify>
    Fetch `/api/admin/audit-logs?startDate=2026-01-01&endDate=2026-12-31` returns filtered results.
    Fetch `/api/admin/audit-logs/export?action=LOGIN` returns CSV file.
  </verify>
  <done>
    Backend audit log endpoint accepts startDate/endDate query params.
    Export endpoint returns CSV with correct Content-Type header.
  </done>
</task>

<task type="auto">
  <name>Build filter UI and CSV export button in Audit Logs tab</name>
  <files>Chat_App-main/frontend/src/hooks/useGetAuditLogs.js, Chat_App-main/frontend/src/pages/admin/AdminDashboard.jsx</files>
  <action>
    1. Update `useGetAuditLogs.js`:
       - Accept filter params: `{ action, userId, startDate, endDate }`
       - Build query string dynamically from non-empty params
       - Expose `setFilters` and `filters` state

    2. In `AdminDashboard.jsx`, add a filter bar above the audit log table (inside the logs tab):
       - **Action type dropdown** (`<select>`) with options: All, LOGIN, LOGOUT, ADMIN_LOGIN, USER_BANNED, USER_UNBANNED
       - **User search** text input (searches by userId — for now just free text; later can be a user picker)
       - **Date range**: two `<input type="date">` fields for start and end date
       - **Apply button** that triggers the hook's fetch
       - **Export CSV button** that calls `/api/admin/audit-logs/export` with the current filters and triggers a browser download

       Style the filter bar as a horizontal flex row with gap-2, using DaisyUI classes:
       - `select select-bordered select-sm` for dropdown
       - `input input-bordered input-sm` for text/date inputs
       - `btn btn-sm btn-primary` for Apply
       - `btn btn-sm btn-outline` for Export

    WHY: Filtering is the #1 usability improvement for audit logs; CSV export enables offline analysis.
  </action>
  <verify>
    Open Admin Dashboard > Audit Logs tab.
    Select action type "LOGIN" and click Apply — only LOGIN entries shown.
    Set a date range and click Apply — filtered results.
    Click Export CSV — browser downloads a .csv file.
  </verify>
  <done>
    Filter bar renders with action dropdown, user input, date range, Apply and Export buttons.
    Filtering works end-to-end. CSV download triggers from export button.
  </done>
</task>

## Success Criteria
- [ ] Backend accepts `startDate` and `endDate` query params for audit log filtering
- [ ] CSV export endpoint returns valid CSV with filtered data
- [ ] Frontend filter bar renders with action type, user, date range inputs
- [ ] Clicking Apply filters the displayed audit logs
- [ ] Clicking Export downloads a CSV file
- [ ] Pagination continues to work alongside filters
