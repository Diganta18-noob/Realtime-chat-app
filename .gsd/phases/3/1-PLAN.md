---
phase: 3
plan: 1
wave: 1
---

# Plan 3.1: Data Models — User Role, Ban Status & AuditLog

## Objective
Extend the User model with `role` and `isBanned` fields, and create a new `AuditLog` model to track login events and admin actions (bans/unbans). This forms the data foundation for all admin features.

## Context
- .gsd/SPEC.md
- Chat_App-main/backend/models/user.model.js

## Tasks

<task type="auto">
  <name>Add role and isBanned fields to User model</name>
  <files>Chat_App-main/backend/models/user.model.js</files>
  <action>
    Add two new fields to the `userSchema`:
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
    These fields should be added AFTER `profilePic` and BEFORE the closing bracket.
  </action>
  <verify>Run `node --check Chat_App-main/backend/models/user.model.js` to validate syntax.</verify>
  <done>User model has `role` (default "user") and `isBanned` (default false) fields.</done>
</task>

<task type="auto">
  <name>Create AuditLog model</name>
  <files>Chat_App-main/backend/models/auditLog.model.js [NEW]</files>
  <action>
    Create a new Mongoose model `AuditLog` with the following schema:
    ```js
    const auditLogSchema = new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      action: {
        type: String,
        enum: ["LOGIN", "LOGOUT", "USER_BANNED", "USER_UNBANNED", "ADMIN_LOGIN"],
        required: true,
      },
      targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // for ban/unban actions
      ipAddress: { type: String },
      userAgent: { type: String },
      details: { type: String }, // optional extra info
    }, { timestamps: true });
    ```
    Export as `AuditLog`.
  </action>
  <verify>Run `node --check Chat_App-main/backend/models/auditLog.model.js`.</verify>
  <done>AuditLog model exists with fields for userId, action, targetUserId, ipAddress, and timestamps.</done>
</task>

## Success Criteria
- [ ] User model has `role` and `isBanned` fields
- [ ] AuditLog model has all required fields for tracking logins and admin actions
