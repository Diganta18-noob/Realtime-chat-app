# SPEC.md — Project Specification

> **Status**: `FINALIZED`

## Vision
Transform the existing chat application into a modern, collaborative, and secure platform. This includes an overhaul of the UI for contemporary design, mobile-first responsiveness, group chat capabilities, performance optimization, enhanced backend security, and comprehensive **Admin & Audit** features.

## Goals
1. Redesign the UI/UX using TailwindCSS and DaisyUI to ensure a modern, premium look.
2. Ensure the application is fully responsive and provides a seamless mobile experience.
3. Optimize the frontend codebase so the UI loads significantly faster (lazy loading, asset optimization).
4. Implement group chat functionality, allowing multiple users to participate in a single conversation.
5. Audit and enhance the security of the backend API (rate limiting, helmet, payload sanitization, JWT rotation).
6. **Admin Dashboard & Controls**: Implement roles so Admins can view user lists, active members, and restrict/ban users.
7. **Audit Logging**: Track when users and admins log in, and record administrative actions (banning/unbanning).
8. **Advanced User Management**: Ban/suspend with durations, force logout, mute, role promotion (user → moderator → admin), user profile drawer.
9. **Analytics Panel**: Real-time active user graphs, messages-per-hour heatmaps, peak usage times, new registrations over time.
10. **Chat Moderation**: View/delete messages from any room, flagged/reported message queue, message search, pinned announcements.
11. **Audit Log Enhancements**: Filter by action type / user / date range, CSV export, expanded action types (MESSAGE_DELETED, ROLE_CHANGED, etc.).
12. **Real-Time Admin Features**: Live activity feed (WebSocket-powered), online users counter, alert system for suspicious activity.
13. **System Settings**: Toggle registration, maintenance mode, max message length, profanity filter word list management.

## Non-Goals (Out of Scope)
- Video/Audio calling capabilities
- Complete rewrite of the backend infrastructure from Express
- End-to-end encryption

## Users
- **Standard Users**: Looking for a reliable, fast, secure platform for 1-on-1 and group communication.
- **Administrators**: Need oversight of the platform, user management, and audit trailing.

## Constraints
- Must integrate with the existing Mongoose/MongoDB data model and Express backend.
- Must leverage the existing Socket.io implementation for real-time features.
- Must maintain the existing JWT authentication flow (upgraded to Access/Refresh tokens).

## Success Criteria
- [ ] Users can navigate a completely restyled, modern, and mobile-responsive interface.
- [ ] Lighthouse performance scores improve (faster initial load time).
- [ ] Users can create new group chats and add/remove participants.
- [ ] Users can send and receive messages in group chats in real-time.
- [ ] Backend is secured against common vulnerabilities (XSS, NoSQL injection, DDoSing routes).
- [ ] Admins can log in, view the active user list, and ban/unban users.
- [ ] Banned users cannot send messages and see a "Restricted by Admin" notice.
- [ ] Login events and admin actions are recorded in an Audit Log.
- [ ] Admin Dashboard shows a stats bar (total users, online now, messages today).
- [ ] Audit Logs can be filtered by action type, user, and date range; and exported as CSV.
- [ ] Admins can suspend users with a configurable duration (1h, 24h, permanent).
