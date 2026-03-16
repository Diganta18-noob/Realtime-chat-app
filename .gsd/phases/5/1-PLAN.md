---
phase: 5
plan: 1
wave: 1
autonomous: true

must_haves:
  truths:
    - "A .env file exists in the Chat_App-main directory with MONGO_DB_URI"
    - "Nodemon is configured in package.json to run development servers"
  artifacts:
    - "Chat_App-main/.env"
    - "Chat_App-main/package.json"
---

# Plan 5.1: DevEx & Environment Configuration

## Objective
Fix the MongoDB connection crash by generating the required `.env` file with proper configuration variables. Also, improve the developer experience by ensuring `nodemon` is used for auto-restarts.

## Context
- .gsd/ROADMAP.md (Phase 5)
- Chat_App-main/package.json (Backend startup scripts)
- Chat_App-main/backend/utils/generateToken.js (Requires JWT_SECRET)

## Tasks

<task type="auto">
  <name>Create Configuration File (.env)</name>
  <files>Chat_App-main/.env</files>
  <action>
    Create a new `.env` file in the root of `Chat_App-main`.
    Add the following essential environment variables:
    ```
    PORT=5000
    MONGO_DB_URI=mongodb://localhost:27017/chat-app
    JWT_SECRET=supersecret123
    JWT_REFRESH_SECRET=refreshtokensecret456
    NODE_ENV=development
    ```
    AVOID: Placing the `.env` inside `backend/`. `dotenv.config()` expects it in the root directory since scripts execute there.
  </action>
  <verify>Get-Content Chat_App-main/.env</verify>
  <done>.env is created containing MONGO_DB_URI and JWT variables.</done>
</task>

<task type="auto">
  <name>Update Startup Scripts for Nodemon</name>
  <files>Chat_App-main/package.json</files>
  <action>
    Update the `scripts` section in `package.json` to ensure `nodemon` handles the backend restart flow correctly.
    - Set `"dev": "nodemon backend/server.js"` (Standard dev command)
    - Preserve `"start": "node backend/server.js"` (For production)
  </action>
  <verify>Get-Content Chat_App-main/package.json</verify>
  <done>package.json includes a `dev` script using nodemon.</done>
</task>

## Success Criteria
- [ ] `.env` exists with `MONGO_DB_URI` string.
- [ ] Backend runs via `nodemon` without crashing on undefined database URIs.
