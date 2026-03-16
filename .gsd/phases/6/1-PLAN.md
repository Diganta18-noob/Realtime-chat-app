---
phase: 6
plan: 1
wave: 1
autonomous: true

must_haves:
  truths:
    - "Auth controller uses ui-avatars.com for default avatars"
    - "Gender checkboxes have clearly visible borders/colors"
    - "Signup & Login forms have a functional toggle to reveal passwords"
  artifacts: []
---

# Plan 6.1: Core UI Fixes & Avatars

## Objective
Address critical UI/UX shortcomings reported by users: replace the broken avatar API, fix invisible gender select buttons, implement a "show password" toggle, and clarify the admin login flow within the standard login component.

## Context
- `backend/controllers/auth.controller.js` (Avatar URL generation)
- `frontend/src/pages/signup/GenderCheckbox.jsx` (Checkbox styling issues)
- `frontend/src/pages/signup/SignUp.jsx` & `frontend/src/pages/login/Login.jsx` (Password fields)

## Tasks

<task type="auto">
  <name>Switch Default Avatar Provider</name>
  <files>Chat_App-main/backend/controllers/auth.controller.js</files>
  <action>
    Change the `boyProfilePic` and `girlProfilePic` URLs to `https://ui-avatars.com/api/?name=${username}&background=random` as a more reliable fallback. (Currently using `iran.liara.run` which is likely failing).
  </action>
  <verify>Get-Content Chat_App-main/backend/controllers/auth.controller.js | Select-String "ui-avatars.com"</verify>
  <done>Avatar URLs are updated to the reliable provider.</done>
</task>

<task type="auto">
  <name>Fix Gender Checkbox Visibility</name>
  <files>Chat_App-main/frontend/src/pages/signup/GenderCheckbox.jsx</files>
  <action>
    Update tailwind classes on the `<input type="checkbox">` elements. Currently, they might be blending into the dark mode background. Add explicit border colors like `border-slate-500 bg-base-100` instead of `border-slate-900`.
  </action>
  <verify>Get-Content Chat_App-main/frontend/src/pages/signup/GenderCheckbox.jsx | Select-String "checkbox"</verify>
  <done>Checkboxes have visible utility classes attached.</done>
</task>

<task type="auto">
  <name>Implement "Show Password" Toggles</name>
  <files>
    Chat_App-main/frontend/src/pages/login/Login.jsx
    Chat_App-main/frontend/src/pages/signup/SignUp.jsx
  </files>
  <action>
    1. Import `HiEye` and `HiEyeOff` from `react-icons/hi`.
    2. Add `const [showPassword, setShowPassword] = useState(false)` state.
    3. Convert `type="password"` to `type={showPassword ? "text" : "password"}`.
    4. Append a clickable absolute icon on the right side of the password inputs to toggle the state.
    5. Ensure the admin logic is apparent: Add a small helper text below Login saying "Admins can log in using their standard credentials."
  </action>
  <verify>Get-Content Chat_App-main/frontend/src/pages/login/Login.jsx | Select-String "showPassword"</verify>
  <done>Password fields function with a visibility toggle.</done>
</task>

## Success Criteria
- [ ] Users receive a valid auto-generated avatar on signup.
- [ ] Checkboxes render visibly against the glassmorphism dark theme.
- [ ] Users can peek at their typed passwords in both Auth forms.
