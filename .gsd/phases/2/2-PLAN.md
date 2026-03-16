---
phase: 2
plan: 2
wave: 1
---

# Plan 2.2: Frontend Auth & Socket Context Upgrade for Access/Refresh Tokens

## Objective
Update the frontend authentication flow to work with the new Access/Refresh token system from Phase 1. The access token must be stored in memory (not localStorage), the Socket.io connection must pass the access token in the `auth` payload, and all API hooks must send the Bearer token in the Authorization header.

## Context
- .gsd/SPEC.md
- .gsd/phases/1/3-SUMMARY.md
- Chat_App-main/frontend/src/context/AuthContext.jsx
- Chat_App-main/frontend/src/context/SocketContext.jsx
- Chat_App-main/frontend/src/hooks/useLogin.js
- Chat_App-main/frontend/src/hooks/useSignup.js

## Tasks

<task type="auto">
  <name>Update AuthContext to store accessToken in state</name>
  <files>Chat_App-main/frontend/src/context/AuthContext.jsx</files>
  <action>
    Update `AuthContext` to also store `accessToken` alongside the user profile.
    - Add a new `accessToken` state variable.
    - Export `setAccessToken` in the context value.
    - `authUser` in localStorage should ONLY store user profile (not the token).
    - The access token is kept in React state only (memory) for security.
    - Add a `refreshAccessToken` function that calls `POST /api/auth/refresh` and updates the accessToken state. This allows silent token renewal.
  </action>
  <verify>Check that AuthContext exports `authUser`, `setAuthUser`, `accessToken`, `setAccessToken`, and `refreshAccessToken`.</verify>
  <done>AuthContext manages access token in memory and provides a refresh function.</done>
</task>

<task type="auto">
  <name>Update SocketContext to use auth token and dynamic URL</name>
  <files>Chat_App-main/frontend/src/context/SocketContext.jsx</files>
  <action>
    1. Import `accessToken` from `AuthContext`.
    2. Change the hardcoded `"https://chat-app-78rr.onrender.com"` URL to `"/"` or an environment variable (it will proxy through Vite in dev mode).
    3. Replace ``query: { userId: authUser._id }`` with ``auth: { token: accessToken }``.
    4. The Socket.io connection should reconnect if the accessToken changes.
    5. Remove ALL commented-out dead code at lines 46-69.
  </action>
  <verify>Check that SocketContext passes the accessToken in `socket.handshake.auth.token` and uses a relative or env URL.</verify>
  <done>Socket.io connects with Bearer auth token. No hardcoded production URL. Dead code removed.</done>
</task>

<task type="auto">
  <name>Update all API hooks to use Bearer Authorization header</name>
  <files>
    Chat_App-main/frontend/src/hooks/useLogin.js
    Chat_App-main/frontend/src/hooks/useSignup.js
    Chat_App-main/frontend/src/hooks/useLogout.js
    Chat_App-main/frontend/src/hooks/useGetMessages.js
    Chat_App-main/frontend/src/hooks/useSendMessage.js
    Chat_App-main/frontend/src/hooks/useGetConversations.js
  </files>
  <action>
    1. In `useLogin.js` and `useSignup.js`:
       - After a successful response, extract `accessToken` from the response JSON.
       - Call `setAccessToken(data.accessToken)` from AuthContext.
       - Store only non-sensitive user data in localStorage (no token).
    2. In `useLogout.js`:
       - Clear the accessToken from AuthContext.
    3. In `useGetMessages.js`, `useSendMessage.js`, `useGetConversations.js`:
       - Import `useAuthContext` and get the `accessToken`.
       - Add `headers: { "Authorization": "Bearer " + accessToken }` to ALL fetch calls.
       - If a fetch returns 401, attempt to call `refreshAccessToken()` and retry.
  </action>
  <verify>Check that all fetch calls include an Authorization header and that login/signup set the accessToken in context.</verify>
  <done>All API hooks send Bearer tokens. Login/Signup store accessToken in memory. 401s trigger a refresh attempt.</done>
</task>

## Success Criteria
- [ ] Access token is stored in React state (memory), NOT localStorage
- [ ] Socket.io passes access token via `auth` payload, not query param
- [ ] All API fetch calls include `Authorization: Bearer <token>` header
- [ ] 401 responses trigger automatic token refresh
- [ ] No hardcoded production URLs remain
