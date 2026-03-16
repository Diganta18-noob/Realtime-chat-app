---
phase: 6
plan: 2
wave: 2
autonomous: true

must_haves:
  truths:
    - "Socket.io initializes after environment secrets are loaded"
    - "Signup form performs real-time username availability checks"
  artifacts: []
---

# Plan 6.2: Real-Time Sync & Validation Checks

## Objective
Fix the fundamental Socket.io connection drop which breaks real-time message syncing across users. Implement a real-time availability check for usernames during sign up.

## Context
- `backend/server.js` & `backend/socket/socket.js` (dotenv initialization ordering bug)
- `backend/routes/auth.routes.js` & `backend/controllers/auth.controller.js` (New validation endpoint)
- `frontend/src/pages/signup/SignUp.jsx` (Debounced query logic)

## Tasks

<task type="auto">
  <name>Fix Socket.io Token Sync Connection Bug</name>
  <files>
    Chat_App-main/backend/socket/socket.js
    Chat_App-main/backend/server.js
  </files>
  <action>
    Currently, `server.js` imports `socket.js` before it successfully configures `dotenv` to point to the root `.env` via absolute path. This causes `process.env.JWT_SECRET` inside `socket.js` to be undefined on boot, instantly failing all real-time websocket connections with an Authentication error.
    - Remove `dotenv.config()` entirely from `socket.js`.
    - In `server.js`, execute the `dotenv.config` logic BEFORE importing the socket module using dynamic imports, or securely pass the JWT secret to the socket file externally. 
    - The safest architectural fix is to keep `dotenv` at the top of `server.js` using `import "dotenv/config"` if possible, but due to absolute pathing, we need an explicit initialization file or re-order.
  </action>
  <verify>Get-Content Chat_App-main/backend/socket/socket.js</verify>
  <done>Socket connections no longer fail with unhandled `JWT_SECRET` errors, allowing message syncing.</done>
</task>

<task type="auto">
  <name>Realtime Username Validation Backend</name>
  <files>
    Chat_App-main/backend/routes/auth.routes.js
    Chat_App-main/backend/controllers/auth.controller.js
  </files>
  <action>
    1. Create a `checkUsername` controller logic: `User.exists({ username })`. Returns `{ available: boolean }`.
    2. Map it to `GET /api/auth/check-username/:username` in the routes.
  </action>
  <verify>Get-Content Chat_App-main/backend/routes/auth.routes.js | Select-String "check-username"</verify>
  <done>Backend exposes a rapid query endpoint for username collisions.</done>
</task>

<task type="auto">
  <name>Realtime Username Validation Frontend</name>
  <files>Chat_App-main/frontend/src/pages/signup/SignUp.jsx</files>
  <action>
    1. Add a `useEffect` hook that listens to `inputs.username`.
    2. Using a `setTimeout` debounce (e.g., 500ms), execute a fetch to `/api/auth/check-username/${username}`.
    3. Render a dynamic UI text element below the username input: "Username is available" (green) or "Username is already taken" (red). Disable the submit button if taken.
  </action>
  <verify>Get-Content Chat_App-main/frontend/src/pages/signup/SignUp.jsx | Select-String "check-username"</verify>
  <done>Frontend accurately reports collision state before form submission.</done>
</task>

## Success Criteria
- [ ] Users logging in dynamically sync chat messages across browser instances securely.
- [ ] The Signup UI visually prevents duplicate username registration synchronously as the user types.
