# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] Complete UI redesign to modern standards
- [ ] Group chat creation functionality
- [ ] Real-time group messaging support

## Phases

### Phase 1: Modern UI Overhaul
**Status**: ⬜ Not Started
**Objective**: Redesign the existing React frontend using TailwindCSS and DaisyUI to ensure a modern, premium look and responsive feel.
**Requirements**: 
- Update global styles, themes, and design tokens
- Restyle Sidebar, MessageContainer, and Auth pages
- Enhance interactive elements and toast notifications

### Phase 2: Backend Group Chat Architecture
**Status**: ⬜ Not Started
**Objective**: Extend the MongoDB schemas, Express routes, and Socket.io architecture to support group chats.
**Requirements**:
- Update `Conversation` model or create `GroupConversation` model to support multiple participants and group names
- Create API endpoints for creating a group and adding/removing members
- Update Socket.io event handling for emitting messages to all participants in a group

### Phase 3: Frontend Group Chat Integration
**Status**: ⬜ Not Started
**Objective**: Implement frontend UI components to support group chat workflows and bind them to the new backend API.
**Requirements**:
- Build a "Create Group" modal
- Update the UI to distinguish between direct messages and group chats
- Update `zustand` state to handle group conversations and participants

### Phase 4: Polish & Performance Verifications
**Status**: ⬜ Not Started
**Objective**: Finalize the application with end-to-end testing, bug fixes, and performance tuning for real-time events.
**Requirements**:
- Test all WebSocket emissions with multiple clients
- Ensure UI does not break on small screens with group participant lists
- Clean up any outstanding tech debt from the transition
