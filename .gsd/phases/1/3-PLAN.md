---
phase: 1
plan: 3
wave: 2
---

# Plan 1.3: Advanced JWT Authentication & Security

## Objective
Upgrade the authentication flow to use the most secure JWT method: a short-lived Access Token (e.g., 15 minutes) sent in the JSON response (to be kept in memory), and a long-lived Refresh Token (e.g., 7 days) stored in a secure, HTTP-only, strict SameSite cookie. This prevents Cross-Site Scripting (XSS) from reading the Refresh Token while minimizing the window a stolen Access Token can be used.

## Context
- .gsd/SPEC.md
- Chat_App-main/backend/utils/generateToken.js
- Chat_App-main/backend/controllers/auth.controller.js
- Chat_App-main/backend/middleware/protectRoute.js

## Tasks

<task type="auto">
  <name>Refactor Token Generation (Access + Refresh)</name>
  <files>Chat_App-main/backend/utils/generateToken.js</files>
  <action>
    Rewrite `generateToken.js` to create TWO tokens:
    1. **Access Token**: Short-lived (15m), signed with `JWT_SECRET`. Return this string directly instead of setting it in a cookie.
    2. **Refresh Token**: Long-lived (7d), signed with a new `JWT_REFRESH_SECRET`. Set this entirely in an HTTP-only cookie.
    
    Update the `generateTokenAndSetCookie` function signature to return the Access Token:
    ```js
    const generateTokens = (userID, res) => {
      const accessToken = jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "15m" });
      const refreshToken = jwt.sign({ userID }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });

      return accessToken;
    };
    export default generateTokens;
    ```
  </action>
  <verify>Run `node --check Chat_App-main/backend/utils/generateToken.js` to validate syntax.</verify>
  <done>Function returns an access token and sets a refreshToken cookie.</done>
</task>

<task type="auto">
  <name>Update Auth Controllers to handle new token flow</name>
  <files>
    Chat_App-main/backend/controllers/auth.controller.js
    Chat_App-main/backend/routes/auth.routes.js
  </files>
  <action>
    1. In `auth.controller.js` `signup` and `login`:
       - Change `generateTokenAndSetCookie` to `const accessToken = generateTokens(user._id, res);`
       - Ensure `accessToken` is included in the JSON `res.status(xx).json({...})` response sent to the frontend.
    2. In `auth.controller.js` `logout`:
       - Change the cookie being cleared from `jwt` to `refreshToken`. (Currently it is incorrectly clearing "jwt" instead of "token").
    3. Add a new `/refresh` route in `auth.routes.js` and a `refreshToken` controller in `auth.controller.js`.
       - The controller should verify `req.cookies.refreshToken` using `JWT_REFRESH_SECRET`.
       - If valid, generate and return a NEW `accessToken` (15m).
  </action>
  <verify>Ensure `auth.controller.js` correctly includes the `accessToken` in the JSON response and clear the correct cookie on logout.</verify>
  <done>Signup and Login controllers return an accessToken. A `/refresh` endpoint exists to mint new access tokens.</done>
</task>

<task type="auto">
  <name>Update Protect Route Middleware & Socket.io Auth</name>
  <files>
    Chat_App-main/backend/middleware/protectRoute.js
    Chat_App-main/backend/socket/socket.js
  </files>
  <action>
    1. In `protectRoute.js`, check for the `Authorization: Bearer <token>` header INSTEAD of `req.cookies.token`.
       ```js
       const authHeader = req.headers.authorization;
       if (!authHeader || !authHeader.startsWith("Bearer ")) {
         return res.status(401).json({ error: "Unauthorized" });
       }
       const token = authHeader.split(" ")[1];
       ```
    2. In `socket.js` (from Plan 1.2), adjust the required handshake auth.
       Since we won't have the access token in a cookie, the frontend should pass the Access Token in the `auth` payload during Socket.io connection.
       ```js
       io.use((socket, next) => {
         const token = socket.handshake.auth.token;
         if (!token) return next(new Error("Authentication error"));
         // verify token using JWT_SECRET
       });
       ```
  </action>
  <verify>Run `node --check Chat_App-main/backend/middleware/protectRoute.js`</verify>
  <done>Middleware expects Bearer token instead of cookie. Socket expects auth token.</done>
</task>

## Success Criteria
- [ ] Backend issues short-lived Access Tokens (JSON) and long-lived Refresh Tokens (Cookie).
- [ ] A `/api/auth/refresh` endpoint exists to rotate Access Tokens.
- [ ] Protected routes require a Bearer token in the Authorization header.
- [ ] Socket.io requires an Access Token in the handshake auth payload.
