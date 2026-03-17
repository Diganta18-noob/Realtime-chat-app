---
phase: 7
plan: 1
wave: 1
---

# Plan 7.1: Backend Group Chat API

## Objective
Update the data models and backend APIs to support creating group chats containing multiple participants.

## Context
- .gsd/SPEC.md
- backend/models/conversation.model.js
- backend/routes/message.routes.js
- backend/controllers/message.controller.js

## Tasks

<task type="auto">
  <name>Update Conversation Schema</name>
  <files>
    backend/models/conversation.model.js
  </files>
  <action>
    Add fields to the `Conversation` model to distinguish groups from DMs:
    - `isGroup`: Boolean, default `false`
    - `groupName`: String, required if `isGroup` is true
    - `groupAdmin`: ObjectId ref to User, required if `isGroup` is true
    - `groupAvatar`: String, default empty
  </action>
  <verify>npm run test</verify>
  <done>Schema successfully updated and compiled.</done>
</task>

<task type="auto">
  <name>Create Group Message Endpoints</name>
  <files>
    backend/controllers/message.controller.js
    backend/routes/message.routes.js
  </files>
  <action>
    Create a new endpoint `POST /api/messages/group` to create a new group.
    - Requires `groupName` and `participants` (array of user IDs) in req.body.
    - Automatically adds `req.user._id` to participants.
    - Saves the new conversation with `isGroup: true` and `groupAdmin: req.user._id`.
    - Emit a socket event `newGroupCreated` to all participants so they see the group immediately.
  </action>
  <verify>npm run test</verify>
  <done>API successfully creates a group and returns the new conversation object.</done>
</task>

<task type="auto">
  <name>Update Sidebar Users/Groups Fetch</name>
  <files>
    backend/controllers/user.controller.js
  </files>
  <action>
    Update `getUsersForSidebar` or create a new endpoint `GET /api/users/conversations` to fetch NOT JUST all users, but also all `Conversation`s where `isGroup: true` and `req.user._id` is in `participants`.
    - This allows the frontend to show groups in the same sidebar list as DMs.
    - Format groups to have `fullName = groupName`, `_id = conversationId`, and `isGroup = true` so the frontend can treat them similarly to contacts.
  </action>
  <verify>npm run test</verify>
  <done>Sidebar endpoint returns both individual users and group conversations.</done>
</task>

## Success Criteria
- [ ] Backend supports creating groups with multiple participants.
- [ ] Users receive group details from the sidebar fetch endpoint.
