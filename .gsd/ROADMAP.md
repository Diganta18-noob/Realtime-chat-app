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

### Phase 5: Backend Group Chat Architecture
**Status**: ⬜ Not Started
**Objective**: Extend the MongoDB schemas, Express routes, and Socket.io architecture to support group chats.
**Requirements**:
- Update `Conversation` model or create `GroupConversation` model to support multiple participants
- Create API endpoints for creating a group and adding/removing members

### Phase 6: Frontend Group Chat Integration
**Status**: ⬜ Not Started
**Objective**: Implement frontend UI components to support group chat workflows.
**Requirements**:
- Build a responsive "Create Group" modal/flow
- Update the UI to distinguish between direct messages and group chats

### Phase 7: Polish & Deployment Prep
**Status**: ⬜ Not Started
**Objective**: Finalize the application with end-to-end testing, bug fixes, and performance tuning for real-time events.
**Requirements**:
- Test all WebSocket emissions with multiple clients (including banned users)
- Run a Lighthouse audit to confirm performance improvements
