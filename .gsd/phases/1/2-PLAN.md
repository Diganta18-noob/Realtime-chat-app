---
phase: 1
plan: 2
wave: 1
---

# Plan 1.2: Secure WebSocket Connections & Clean Up Dead Code

## Objective
Secure the Socket.io connection by validating the JWT token during the WebSocket handshake, remove commented-out dead code from socket.js, and ensure only authenticated users can establish a WebSocket connection.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- Chat_App-main/backend/socket/socket.js
- Chat_App-main/backend/middleware/protectRoute.js

## Tasks

<task type="auto">
  <name>Add JWT verification to Socket.io handshake</name>
  <files>Chat_App-main/backend/socket/socket.js</files>
  <action>
    Import `jwt` and `cookie` (use the built-in `cookie` module or parse from handshake headers):
    ```js
    import jwt from "jsonwebtoken";
    import dotenv from "dotenv";
    dotenv.config();
    ```
    
    Add a Socket.io middleware BEFORE `io.on("connection")`:
    ```js
    io.use((socket, next) => {
      try {
        const cookieHeader = socket.handshake.headers.cookie;
        if (!cookieHeader) return next(new Error("Authentication error"));
        
        // Parse the "token" cookie
        const tokenMatch = cookieHeader.split(";").find(c => c.trim().startsWith("token="));
        if (!tokenMatch) return next(new Error("Authentication error"));
        
        const token = tokenMatch.split("=")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.userID;
        next();
      } catch (err) {
        next(new Error("Authentication error"));
      }
    });
    ```
    
    Then update `io.on("connection")` to use `socket.userId` instead of `socket.handshake.query.userId`.
    This ensures only valid JWT holders can connect.
    
    IMPORTANT: Remove the entire commented-out dead code block at lines 38-61.
  </action>
  <verify>Run `node --check Chat_App-main/backend/socket/socket.js` to validate syntax. Start the server and confirm WebSocket connection still works with a logged-in user.</verify>
  <done>Socket.io validates JWT from cookie before connection. `socket.userId` is set from the decoded token. No commented-out dead code remains.</done>
</task>

<task type="auto">
  <name>Add CORS environment variable support</name>
  <files>Chat_App-main/backend/socket/socket.js</files>
  <action>
    Replace the hardcoded CORS origin `["http://localhost:3000"]` with an environment variable:
    ```js
    const io = new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    ```
    This allows flexible deployment without code changes. Add `credentials: true` to enable cookie sending.
  </action>
  <verify>Run `node --check Chat_App-main/backend/socket/socket.js` to validate syntax.</verify>
  <done>CORS origin is configurable via `CLIENT_URL` env var. `credentials: true` is set on Socket.io CORS.</done>
</task>

## Success Criteria
- [ ] WebSocket connections require a valid JWT cookie (unauthenticated connections are rejected)
- [ ] `socket.userId` comes from decoded JWT, not query parameter
- [ ] CORS origin is configurable via environment variable
- [ ] No commented-out dead code in `socket.js`
