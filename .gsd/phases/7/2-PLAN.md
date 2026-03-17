---
phase: 7
plan: 2
wave: 2
---

# Plan 7.2: Frontend Create Group Flow

## Objective
Implement a "Create Group" modal in the React frontend and modify the Sidebar and MessageContainer to support group chats.

## Context
- .gsd/SPEC.md
- frontend/src/components/sidebar/Sidebar.jsx
- frontend/src/components/sidebar/Conversations.jsx
- frontend/src/components/messages/MessageContainer.jsx

## Tasks

<task type="auto">
  <name>Create Group Modal Component</name>
  <files>
    frontend/src/components/sidebar/CreateGroupModal.jsx
    frontend/src/components/sidebar/Sidebar.jsx
    frontend/src/hooks/useCreateGroup.js
  </files>
  <action>
    - Build a `CreateGroupModal` UI using DaisyUI modal syntax.
    - Show an input for `groupName` and a multi-select checkbox list for selecting users.
    - Add a button in `Sidebar.jsx` (e.g., next to search or header) to open the modal.
    - Create a hook `useCreateGroup.js` that calls `POST /api/messages/group` with the selected participants and group name.
  </action>
  <verify>npm run test</verify>
  <done>User can successfully open modal, select users, and create a group.</done>
</task>

<task type="auto">
  <name>Update Frontend Sidebar Display</name>
  <files>
    frontend/src/zustand/useConversation.js
    frontend/src/hooks/useGetConversations.js
    frontend/src/components/sidebar/Conversation.jsx
  </files>
  <action>
    - Refactor `useGetConversations` to handle the new backend schema (where groups and users are mixed).
    - Update `Conversation.jsx` to render group avatars (e.g., a generic group icon or initials) and the `groupName`.
    - Ensure `useConversation` zustand store correctly handles an `isGroup` flag.
  </action>
  <verify>npm run test</verify>
  <done>Groups appear in the sidebar with a distinct look (or just functioning correctly).</done>
</task>

<task type="auto">
  <name>Fix Group Messaging Logic</name>
  <files>
    frontend/src/hooks/useSendMessage.js
    backend/controllers/message.controller.js
  </files>
  <action>
    - Ensure `useSendMessage` works correctly when `selectedConversation.isGroup` is true.
    - If sending to a group, the request should go to the `conversationId` rather than a `receiverId`. Update backend `sendMessage` to accept a `conversationId` instead of finding a DM if `isGroup` is true.
    - Ensure socket events `newMessage` broadcast to all participants in the group, not just one receiver.
  </action>
  <verify>npm run test</verify>
  <done>Messages can be sent and received in real-time within a group.</done>
</task>

## Success Criteria
- [ ] Users can click a "Create Group" button.
- [ ] Modal allows multi-selection of friends.
- [ ] Group chat appears in the sidebar and supports messaging.
