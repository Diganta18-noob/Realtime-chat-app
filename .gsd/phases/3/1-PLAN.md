---
phase: 3
plan: 1
wave: 1
depends_on: []
files_modified:
  - Chat_App-main/backend/models/user.model.js
  - Chat_App-main/backend/models/auditLog.model.js
autonomous: true
user_setup: []

must_haves:
  truths:
    - "User model has a `role` field with enum ['user', 'admin'] defaulting to 'user'"
    - "User model has an `isBanned` field (Boolean, default false)"
    - "AuditLog model exists with userId, action, targetUserId, ipAddress, userAgent, details, timestamps"
    - "AuditLog action enum covers: LOGIN, LOGOUT, USER_BANNED, USER_UNBANNED, ADMIN_LOGIN"
  artifacts:
    - "Chat_App-main/backend/models/user.model.js — role + isBanned fields present"
    - "Chat_App-main/backend/models/auditLog.model.js — new file created"
---

# Plan 3.1: Data Models — User Role, Ban Status & AuditLog

<objective>
Extend the User model with `role` and `isBanned` fields, and create a new `AuditLog` Mongoose model to track login events and admin actions (bans/unbans). This forms the data foundation for all admin features in Phase 3.

Purpose: Without these schema changes, no admin or audit functionality can exist.
Output: Updated user.model.js and new auditLog.model.js.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- Chat_App-main/backend/models/user.model.js
</context>

<tasks>

<task type="auto">
  <name>Add role and isBanned fields to User model</name>
  <files>Chat_App-main/backend/models/user.model.js</files>
  <action>
    Add two new fields to the `userSchema`, AFTER the `profilePic` field and BEFORE the closing bracket of the schema object:
    ```js
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    ```
    AVOID: setting `required: true` on either field — they must have defaults so existing users are unaffected on schema migration.
  </action>
  <verify>node --check Chat_App-main/backend/models/user.model.js</verify>
  <done>user.model.js has `role` (default "user") and `isBanned` (default false) fields with no syntax errors.</done>
</task>

<task type="auto">
  <name>Create AuditLog model</name>
  <files>Chat_App-main/backend/models/auditLog.model.js</files>
  <action>
    Create a new file with this exact Mongoose schema:
    ```js
    import mongoose from "mongoose";

    const auditLogSchema = new mongoose.Schema(
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        action: {
          type: String,
          enum: ["LOGIN", "LOGOUT", "USER_BANNED", "USER_UNBANNED", "ADMIN_LOGIN"],
          required: true,
        },
        targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        ipAddress: { type: String },
        userAgent: { type: String },
        details: { type: String },
      },
      { timestamps: true }
    );

    const AuditLog = mongoose.model("AuditLog", auditLogSchema);

    export default AuditLog;
    ```
    AVOID: adding indexes at this stage — keep it simple; add them only if query performance is measured to be slow.
  </action>
  <verify>node --check Chat_App-main/backend/models/auditLog.model.js</verify>
  <done>auditLog.model.js exists and passes syntax check. Exports `AuditLog` default.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] `node --check Chat_App-main/backend/models/user.model.js` succeeds
- [ ] `node --check Chat_App-main/backend/models/auditLog.model.js` succeeds
- [ ] user.model.js contains both `role` and `isBanned` fields
- [ ] auditLog.model.js contains action enum with all 5 values
</verification>

<success_criteria>
- [ ] User model has `role` and `isBanned` fields with safe defaults
- [ ] AuditLog model exists with all required fields for tracking logins and admin actions
- [ ] Both files pass Node syntax check
</success_criteria>
