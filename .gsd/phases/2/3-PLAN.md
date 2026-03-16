---
phase: 2
plan: 3
wave: 2
---

# Plan 2.3: Responsive Layout, Modern Pages & Lazy Loading

## Objective
Restyle the Login, Signup, and Home pages with modern, premium aesthetics and fully responsive mobile-first layouts. Implement React lazy loading for route-based code splitting to improve initial load performance.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- Chat_App-main/frontend/src/App.jsx
- Chat_App-main/frontend/src/pages/home/Home.jsx
- Chat_App-main/frontend/src/pages/login/Login.jsx
- Chat_App-main/frontend/src/pages/signup/SignUp.jsx
- Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
- Chat_App-main/frontend/src/components/messages/MessageContainer.jsx

## Tasks

<task type="auto">
  <name>Add lazy loading for routes in App.jsx</name>
  <files>Chat_App-main/frontend/src/App.jsx</files>
  <action>
    1. Import `React.lazy` and `Suspense` from React.
    2. Lazy load the Home, Login, and SignUp pages:
       ```jsx
       const Home = React.lazy(() => import("./pages/home/Home"));
       const Login = React.lazy(() => import("./pages/login/Login"));
       const SignUp = React.lazy(() => import("./pages/signup/SignUp"));
       ```
    3. Wrap `<Routes>` in a `<Suspense fallback={<LoadingSpinner />}>` where LoadingSpinner is a centered DaisyUI loading spinner.
    4. Remove the static imports for Home, Login, SignUp.
    5. Update the outer div to use `min-h-screen` instead of `h-screen` for better mobile behavior, and replace `p-4` with responsive padding.
  </action>
  <verify>Run `npm run build --prefix Chat_App-main/frontend` to confirm code splitting produces separate chunks.</verify>
  <done>Routes are lazy-loaded with a loading spinner fallback. Build output shows separate chunks.</done>
</task>

<task type="auto">
  <name>Restyle Login and Signup pages for mobile-first premium design</name>
  <files>
    Chat_App-main/frontend/src/pages/login/Login.jsx
    Chat_App-main/frontend/src/pages/signup/SignUp.jsx
  </files>
  <action>
    Redesign both pages with modern styling:
    1. Login Page:
       - Full-screen centered card using the `.glass-card` class.
       - App logo/brand at the top with gradient text (purple to teal).
       - Styled inputs using DaisyUI `input-primary` with focus ring.
       - "Login" button with gradient background (`bg-gradient-to-r from-primary to-secondary`).
       - Mobile: Card takes full width with smaller padding. Desktop: max-w-md centered.
       - Add subtle entrance animation (fade-in + slide-up).
    2. SignUp Page:
       - Mirror the Login page style but with additional fields.
       - Gender selector using DaisyUI radio buttons styled as a toggle.
       - Same responsive treatment as Login.
  </action>
  <verify>Open both pages in the Vite dev server on mobile (375px) and desktop (1440px) viewports.</verify>
  <done>Login and Signup pages look premium, responsive, and use glassmorphism with gradient accents.</done>
</task>

<task type="auto">
  <name>Restyle Home layout (Sidebar + Messages) for responsive design</name>
  <files>
    Chat_App-main/frontend/src/pages/home/Home.jsx
    Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
    Chat_App-main/frontend/src/components/messages/MessageContainer.jsx
    Chat_App-main/frontend/src/components/messages/MessageInput.jsx
    Chat_App-main/frontend/src/components/messages/Message.jsx
    Chat_App-main/frontend/src/components/messages/Messages.jsx
    Chat_App-main/frontend/src/components/sidebar/Conversation.jsx
    Chat_App-main/frontend/src/components/sidebar/Conversations.jsx
    Chat_App-main/frontend/src/components/sidebar/SearchInput.jsx
    Chat_App-main/frontend/src/components/sidebar/LogoutButton.jsx
  </files>
  <action>
    1. Home.jsx:
       - On mobile: Full-screen layout. Show Sidebar by default, toggle to MessageContainer when a conversation is selected (use zustand selection state).
       - On desktop: Side-by-side layout as before but using `h-screen` with the `.glass-card` style.
       - Add smooth transitions when switching views on mobile.
    2. Sidebar.jsx:
       - Use `base-200` background with rounded corners.
       - On mobile: full width. On desktop: `w-80` fixed width.
       - Styled search input with an icon and focus ring.
       - Conversation items with hover effects and active state highlighting.
       - Online indicator dots with the pulse animation from index.css.
       - Remove all dead commented code.
    3. MessageContainer.jsx:
       - Chat header: Show user avatar, name, and online status with accent colors.
       - Messages area: Scrollable with chat bubble styling (DaisyUI `chat chat-start/chat-end`).
       - Message bubbles: Use `primary` color for own messages, `base-300` for received.
       - MessageInput: Styled with an icon button for send, rounded corners, and focus ring.
       - Remove all dead commented code.
  </action>
  <verify>Open the app in the browser at mobile (375px) and desktop (1440px) viewports to confirm responsive behavior.</verify>
  <done>Home page is fully responsive: sidebar-only on mobile, side-by-side on desktop. Premium styling applied to all components.</done>
</task>

## Success Criteria
- [ ] Routes are lazy-loaded with a Suspense fallback spinner
- [ ] Login and Signup pages are premium-styled and responsive
- [ ] Home page switches between sidebar and messages on mobile
- [ ] Chat bubbles use DaisyUI chat components with themed colors
- [ ] All components use the design system tokens (no hardcoded colors)
