# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] Complete UI redesign to modern standards (Responsive & Mobile-first)
- [ ] Group chat creation functionality
- [ ] Real-time group messaging support
- [ ] Frontend Performance optimization (fast initial loading)
- [ ] Backend Security hardening

## Phases

### Phase 1: Security & Foundation
**Status**: ⬜ Not Started
**Objective**: Audit and secure the backend API before adding new complex features, and ensure the foundation is solid.
**Requirements**: 
- Add Express rate limiting to prevent brute force attacks
- Add Helmet to secure HTTP headers
- Sanitize database inputs to prevent NoSQL injection (e.g., `express-mongo-sanitize`)
- Secure WebSockets against unauthorized connections

### Phase 2: Modern Mobile-First UI Overhaul & Optimization
**Status**: ⬜ Not Started
**Objective**: Redesign the existing React frontend using TailwindCSS/DaisyUI focusing heavily on responsiveness, mobile UX, and load performance.
**Requirements**: 
- Update global styles, themes, and design tokens for a premium look
- Refactor layouts to be fully responsive (mobile, tablet, desktop)
- Implement code splitting/lazy loading for React routes to improve initial load time
- Optimize static assets (images, icons)

### Phase 3: Backend Group Chat Architecture
**Status**: ⬜ Not Started
**Objective**: Extend the MongoDB schemas, Express routes, and Socket.io architecture to support group chats.
**Requirements**:
- Update `Conversation` model or create `GroupConversation` model to support multiple participants and group names/avatars
- Create API endpoints for creating a group and adding/removing members
- Update Socket.io event handling for emitting messages to all participants in a group

### Phase 4: Frontend Group Chat Integration
**Status**: ⬜ Not Started
**Objective**: Implement frontend UI components to support group chat workflows and bind them to the new backend API.
**Requirements**:
- Build a responsive "Create Group" modal/flow
- Update the UI to distinguish between direct messages and group chats
- Update `zustand` state to handle group conversations and participants

### Phase 5: Polish & Deployment Prep
**Status**: ⬜ Not Started
**Objective**: Finalize the application with end-to-end testing, bug fixes, and performance tuning for real-time events.
**Requirements**:
- Test all WebSocket emissions with multiple clients
- Run a Lighthouse audit to confirm performance improvements
- Finalize production build environment
