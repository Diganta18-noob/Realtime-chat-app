# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] Complete UI redesign to modern standards (Responsive & Mobile-first)
- [ ] Group chat creation functionality
- [ ] Real-time group messaging support
- [ ] Frontend Performance optimization (fast initial loading)
- [ ] Backend Security hardening (Access/Refresh Tokens)
- [ ] Admin Dashboard (View users, active connections, ban controls)
- [ ] Audit Logging (Login tracking, ban histories)
- [ ] User restrictions (Banned users cannot chat, see notice)

## Phases

### Phase 1: Security & Foundation
**Status**: ✅ Complete
**Objective**: Audit and secure the backend API before adding new complex features, and ensure the foundation is solid.
**Requirements**: 
- Implement Access & Refresh Token rotation
- Add Express rate limiting to prevent brute force attacks
- Add Helmet to secure HTTP headers
- Sanitize database inputs to prevent NoSQL injection (`express-mongo-sanitize`)
- Secure WebSockets against unauthorized connections

### Phase 2: Modern Mobile-First UI Overhaul & Optimization
**Status**: ✅ Complete
**Objective**: Redesign the existing React frontend using TailwindCSS/DaisyUI focusing heavily on responsiveness, mobile UX, and load performance.
**Requirements**: 
- Update global styles, themes, and design tokens for a premium look
- Refactor layouts to be fully responsive (mobile, tablet, desktop)
- Implement lazy loading for React routes to improve initial load time

### Phase 3: Admin & Audit Architecture (Backend)
**Status**: ✅ Complete
**Objective**: Extend the backend models and routes to support administrator roles, user bans, and comprehensive audit logs.
**Requirements**:
- Add `role` (`user`, `admin`) and `isBanned` flags to the User model
- Create an `AuditLog` model to track login events (time, IP/agent) and admin actions
- Implement `/api/admin/*` protected routes (fetching user lists, active sockets, and ban toggles)
- Add middleware to block message creation for banned users (returning a 403 Restricted error)

### Phase 4: Admin Dashboard & Settings UI (Frontend)
**Status**: ✅ Complete
**Objective**: Create the React frontend views for administrators to manage the application and users.
**Requirements**:
- Build a protected Admin Dashboard route
- Display a table of all users with their ban status, online status, and login history
- Implement toggle switches to ban/unban users and display the "Restricted" notice if a banned user visits the chat

### Phase 5: DevEx & Environment Configuration
**Status**: ✅ Complete
**Objective**: Fix the MongoDB connection string error and improve developer experience.
**Requirements**:
- Create `.env` file with required environment variables (`MONGO_DB_URI`, `PORT`, `JWT_SECRET`, `JWT_REFRESH_SECRET`).
- Configure backend scripts to use `nodemon` for automatic restarts during development.

### Phase 6: Core Bug Fixes & Real-Time Stabilization
**Status**: ✅ Complete
**Objective**: Fix critical UI, API, and Real-Time connection bugs before proceeding with new features.
**Requirements**:
- **UI Tweaks**: Fix the "Show Password" toggle on Signup/Login, ensure gender checkboxes are visible, and clarify admin login semantics.
- **Avatars**: Switch the broken avatar generator API to a reliable one.
- **Real-Time Engine**: Fix the `socket.js` connection dropping (due to broken env loading) so messages sync perfectly across clients.
- **Validation**: Implement real-time username duplication checks on the Signup form.
- Create API endpoints for creating a group and adding/removing members

### Phase 7: Frontend Group Chat Integration
**Status**: ⬜ Not Started
**Objective**: Implement frontend UI components to support group chat workflows.
**Requirements**:
- Build a responsive "Create Group" modal/flow
- Update the UI to distinguish between direct messages and group chats

### Phase 8: Polish & Deployment Prep
**Status**: ⬜ Not Started
**Objective**: Finalize the application with end-to-end testing, bug fixes, and performance tuning for real-time events.
**Requirements**:
- Test all WebSocket emissions with multiple clients (including banned users)
- Run a Lighthouse audit to confirm performance improvements

### Phase 9: Active Status & Admin Timing Fixes
**Status**: ⬜ Not Started
**Objective**: Fix the user active status display and show accurate login/logout timings in the admin dashboard.
**Requirements**:
- Fix active status presence logic so that user's online/offline status correctly updates real-time.
- Enhance Admin Dashboard to display each user's latest login and logout timestamps.

### Phase 10: Admin Dashboard Quick Wins
**Status**: ⬜ Not Started
**Objective**: Implement the highest-value, lowest-effort improvements to the existing Admin Dashboard.
**Requirements**:
- Add a stats bar at the top of the dashboard (total users, online now, messages today)
- Enhance Audit Log tab with filters (action type, user, date range) and CSV export
- Add suspend duration options (1h, 24h, permanent) to the existing ban toggle

### Phase 11: Advanced User & Role Management
**Status**: ⬜ Not Started
**Objective**: Extend user management capabilities for admins.
**Requirements**:
- Force logout — kick a user's active WebSocket session
- Admin-triggered password reset
- Role management — promote/demote user ↔ moderator ↔ admin
- User profile drawer — click a user row to see full details (bio, joined date, message count)
- Mute user — prevent sending messages without a full ban

### Phase 12: Analytics & Chat Moderation
**Status**: ⬜ Not Started
**Objective**: Add an Analytics tab and a Chat Moderation tab to the Admin Dashboard.
**Requirements**:
- Active users graph — real-time online count over time (Chart.js / Recharts)
- Messages per hour heatmap and peak usage times
- New registrations over time
- View all chat rooms/channels with message counts
- Delete messages from any room
- Flagged/reported messages queue
- Search messages by user or keyword
- Pin announcements to rooms

### Phase 13: Real-Time Admin Alerts & System Settings
**Status**: ⬜ Not Started
**Objective**: Add WebSocket-powered live admin features and system-wide configuration controls.
**Requirements**:
- Live activity feed — shows events as they happen
- Online users counter in the header
- Alert system — notify admin on suspicious activity (too many failed logins, rapid message spam)
- Toggle registration open/closed
- Maintenance mode — disconnect all users with a message
- Max message length configuration
- Profanity filter word list management
