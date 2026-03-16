---
phase: 2
plan: 1
wave: 1
---

# Plan 2.1: Design System, Theme & Global Styles

## Objective
Overhaul the Tailwind/DaisyUI configuration with a premium dark-mode theme, custom color palette, Google Fonts, and responsive design tokens. Update `index.css` with modern global styles and CSS custom properties. Clean up dead code across all frontend files.

## Context
- .gsd/SPEC.md
- .gsd/ARCHITECTURE.md
- Chat_App-main/frontend/tailwind.config.js
- Chat_App-main/frontend/src/index.css

## Tasks

<task type="auto">
  <name>Configure Tailwind with custom DaisyUI dark theme and Google Fonts</name>
  <files>
    Chat_App-main/frontend/tailwind.config.js
    Chat_App-main/frontend/index.html
  </files>
  <action>
    1. Update `tailwind.config.js`:
       - Add a custom DaisyUI theme called `"chatdark"` with:
         - `primary`: "#6D28D9" (purple-700)
         - `secondary`: "#A78BFA" (purple-400)
         - `accent`: "#2DD4BF" (teal-400)
         - `neutral`: "#1E1B2E" (deep dark purple)
         - `base-100`: "#0F0D1A" (darkest background)
         - `base-200`: "#1A172B" (sidebar/card bg)
         - `base-300`: "#262040" (elevated surfaces)
         - `info`, `success`, `warning`, `error` colors
       - Set `daisyui: { themes: ["chatdark"] }` to make it default.
       - Extend the theme with custom font family: `fontFamily: { sans: ["Inter", "sans-serif"] }`
       - Add breakpoint for `xs: "475px"` for extra-small devices.
    2. In `index.html`, add a Google Fonts link for "Inter" with weights 400, 500, 600, 700.
       Also add `data-theme="chatdark"` to the `<html>` element.
  </action>
  <verify>Run `npx tailwindcss --help` to confirm Tailwind resolves. Open `tailwind.config.js` to verify the theme is defined.</verify>
  <done>Tailwind config has a custom `chatdark` DaisyUI theme. Inter font is loaded via Google Fonts. `data-theme` is set on `<html>`.</done>
</task>

<task type="auto">
  <name>Revamp index.css with modern global styles</name>
  <files>Chat_App-main/frontend/src/index.css</files>
  <action>
    Replace the entire `index.css` with a modern design system:
    1. Keep `@tailwind` directives.
    2. Define CSS custom properties on `:root` for animations (transitions, durations).
    3. Body: Use a dark gradient background instead of the `bg.png` image for a premium look. Example: `background: linear-gradient(135deg, #0F0D1A 0%, #1A172B 50%, #1E1442 100%)`.
    4. Keep the custom scrollbar styles but update them to match the theme colors.
    5. Add smooth global transitions: `* { transition: background-color 0.2s ease, color 0.2s ease; }`
    6. Add a utility class `.glass-card` for reusable glassmorphism: `backdrop-filter: blur(16px); background: rgba(30, 27, 46, 0.6); border: 1px solid rgba(109, 40, 217, 0.15);`
    7. Keep the `.shake` animation.
    8. Add a subtle pulse animation for online indicator dots.
  </action>
  <verify>Check that index.css has no syntax errors by running the Vite dev server.</verify>
  <done>index.css has CSS custom properties, gradient background, glassmorphism utility, and modern scrollbar styles.</done>
</task>

<task type="auto">
  <name>Clean up dead commented code across ALL frontend files</name>
  <files>
    Chat_App-main/frontend/src/components/sidebar/Sidebar.jsx
    Chat_App-main/frontend/src/components/messages/MessageContainer.jsx
    Chat_App-main/frontend/src/context/SocketContext.jsx
  </files>
  <action>
    Remove ALL commented-out dead code blocks from:
    1. `Sidebar.jsx` — Lines 20-37 (old sidebar code)
    2. `MessageContainer.jsx` — Lines 51-100 (old message container code)
    3. `SocketContext.jsx` — Lines 46-69 (old socket context code)
    These add no value and clutter the codebase.
  </action>
  <verify>Run `npx vite build --mode development` to confirm no import or syntax errors after cleanup.</verify>
  <done>No commented-out dead code blocks remain in any frontend component file.</done>
</task>

## Success Criteria
- [ ] Custom DaisyUI dark theme with premium purple/teal palette is active
- [ ] Inter font loaded from Google Fonts and applied globally
- [ ] Gradient background replaces the old `bg.png` image
- [ ] Glassmorphism utility class `.glass-card` available
- [ ] All dead commented code removed from frontend files
