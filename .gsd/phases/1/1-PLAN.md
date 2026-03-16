---
phase: 1
plan: 1
wave: 1
---

# Plan 1.1: Harden Express Server with Security Middleware

## Objective
Install and wire up essential security middleware to protect the Express backend against common web vulnerabilities: XSS via headers, brute-force attacks on auth routes, and NoSQL injection attacks. Also limit JSON body size to prevent payload bombs.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- Chat_App-main/backend/server.js
- Chat_App-main/backend/routes/auth.routes.js

## Tasks

<task type="auto">
  <name>Install security packages</name>
  <files>Chat_App-main/package.json</files>
  <action>
    Run `npm install helmet express-rate-limit express-mongo-sanitize` in the `Chat_App-main/` directory.
    - `helmet` — sets secure HTTP headers (CSP, X-Frame-Options, etc.)
    - `express-rate-limit` — rate limiting middleware
    - `express-mongo-sanitize` — strips `$` and `.` from user input to prevent NoSQL injection
  </action>
  <verify>Run `npm ls helmet express-rate-limit express-mongo-sanitize` in `Chat_App-main/` to confirm all three are installed.</verify>
  <done>All three packages appear in `package.json` dependencies.</done>
</task>

<task type="auto">
  <name>Wire security middleware into server.js</name>
  <files>Chat_App-main/backend/server.js</files>
  <action>
    At the top of server.js, import the new packages:
    ```js
    import helmet from "helmet";
    import rateLimit from "express-rate-limit";
    import mongoSanitize from "express-mongo-sanitize";
    ```
    After `app.use(express.json())`, add in this order:
    1. `app.use(helmet())` — secure HTTP headers
    2. `app.use(mongoSanitize())` — sanitize all req.body, req.query, req.params
    3. `app.use(express.json({ limit: "10kb" }))` — replace the existing `express.json()` call to limit payload size
    4. Create an auth-specific rate limiter:
    ```js
    const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 20, // max 20 requests per window per IP
      message: { error: "Too many requests, please try again later." },
    });
    ```
    Apply it to the auth route: `app.use("/api/auth", authLimiter, authRoutes);`
    
    IMPORTANT: Remove the large block of commented-out code at lines 37-65 (dead code cleanup).
  </action>
  <verify>Run `node --check Chat_App-main/backend/server.js` to validate syntax. Start the server and confirm it boots without errors.</verify>
  <done>server.js imports and uses helmet, mongoSanitize, rate limiter on auth routes. No dead commented code remains.</done>
</task>

## Success Criteria
- [ ] `helmet`, `express-rate-limit`, `express-mongo-sanitize` installed and in `package.json`
- [ ] `server.js` applies all three middleware before routes
- [ ] Auth routes are rate-limited to 20 requests per 15 minutes
- [ ] JSON payload limited to 10kb
- [ ] No commented-out dead code in `server.js`
