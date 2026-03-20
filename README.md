<div align="center">

```
 ██████╗ ██████╗ ██████╗ ██████╗ ██╗████████╗     ██████╗██╗  ██╗ █████╗ ████████╗
██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██║╚══██╔══╝    ██╔════╝██║  ██║██╔══██╗╚══██╔══╝
██║   ██║██████╔╝██████╔╝██║  ██║██║   ██║       ██║     ███████║███████║   ██║
██║   ██║██╔══██╗██╔══██╗██║  ██║██║   ██║       ██║     ██╔══██║██╔══██║   ██║
╚██████╔╝██║  ██║██████╔╝██████╔╝██║   ██║       ╚██████╗██║  ██║██║  ██║   ██║
 ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═════╝ ╚═╝   ╚═╝        ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
```

<div align="center">
  <a href="https://github.com/Diganta18-noob/Realtime-chat-app">
    <img src="https://readme-typing-svg.demolab.com?font=Space+Mono&weight=700&size=22&duration=2500&pause=1000&color=8B5CF6&center=true&vCenter=true&width=800&height=50&lines=Orbit+Chat+%E2%80%94+Real-time+messaging,+forged+in+the+dark.;Socket.IO+%E2%80%A2+React+18+%E2%80%A2+Express+%E2%80%A2+Supabase;Dual-Token+JWT+Auth+with+Silent+Renewal;Cinematic+Glassmorphism+Aesthetic" alt="Typing SVG" />
  </a>
</div>

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.7-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

[![Stars](https://img.shields.io/github/stars/Diganta18-noob/Realtime-chat-app?style=social)](https://github.com/Diganta18-noob/Realtime-chat-app/stargazers)
[![Forks](https://img.shields.io/github/forks/Diganta18-noob/Realtime-chat-app?style=social)](https://github.com/Diganta18-noob/Realtime-chat-app/network/members)
[![Issues](https://img.shields.io/github/issues/Diganta18-noob/Realtime-chat-app?style=social)](https://github.com/Diganta18-noob/Realtime-chat-app/issues)

</div>

---

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🌌 What Is This?

Orbit Chat is a **production-grade real-time messaging platform** built on a dark, cinematic glassmorphism aesthetic — think deep purples (`#6D28D9`), midnight blacks (`#0F0D1A`), and soft violet glows. Under the hood, it pairs a **React 18 + Zustand** frontend with an **Express + Socket.IO** backend, all backed by **Supabase (PostgreSQL)** for persistence. Every message travels over persistent WebSocket connections with full **sent → delivered → read** receipt tracking, while a custom **dual-token JWT system** (15-minute access + 24-hour httpOnly refresh cookie) keeps sessions airtight without ever touching localStorage. It ships with a complete **admin dashboard**, group chat support, and a Docker Compose stack that puts Nginx in front of everything — ready to deploy.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## ✨ Feature Showcase

### 💬 Messaging

| | Feature | Description |
|---|---|---|
| 💬 | **Real-Time DMs** | Instant 1-on-1 messages over Socket.IO with auto-created conversations |
| 👥 | **Group Chat** | Create named groups with multiple participants and a dedicated group avatar |
| ✅ | **Triple-State Receipts** | Messages track `sent` → `delivered` → `read` status in real time |
| 🔔 | **Unread Counts** | Per-sender unread badge counts via `message_read_by` join table |
| 🟢 | **Online Presence** | Live online/offline user indicators broadcast to all connected clients |
| 📨 | **Offline Delivery Queue** | Pending messages auto-promoted to `delivered` when recipient connects |

### 🔐 Authentication

| | Feature | Description |
|---|---|---|
| 🔑 | **Dual-Token JWT** | 15-min access token (Bearer) + 24-hr refresh token (httpOnly cookie) |
| 🔄 | **Silent Token Renewal** | Axios interceptor auto-refreshes expired tokens without user disruption |
| 🚪 | **Persistent Sessions** | `GET /api/auth/me` verifies identity on every mount with loading state |
| 📝 | **Input Validation** | `express-validator` sanitizes + validates every field on signup & login |
| 🚫 | **Ban Enforcement** | Banned users rejected at login with clear administrator message |
| ☠️ | **Soft Delete Check** | Deleted accounts blocked from authentication entirely |

### 📮 Signup & Account

| | Feature | Description |
|---|---|---|
| 🔍 | **Live Username Check** | Real-time `GET /api/auth/check-username/:username` availability probe |
| 🧑‍🎨 | **Gendered Avatars** | DiceBear `adventurer` / `adventurer-neutral` styles auto-assigned by gender |
| 📧 | **Email Verification** | Crypto token emailed on signup, verified via `POST /api/auth/verify-email` |
| 🔐 | **Forgot Password** | Secure reset flow with 1-hour expiring token sent via SMTP / Nodemailer |
| 🔁 | **Password Reset** | Token-validated `POST /api/auth/reset-password` with bcrypt re-hashing |
| 🛡️ | **Anti-Enumeration** | Forgot-password always returns 200 regardless of email existence |

### 🛠️ Admin Dashboard

| | Feature | Description |
|---|---|---|
| 📊 | **Live Stats** | Total users, online now (from socket map), messages today — all real-time |
| 👤 | **User Management** | Full user list with role, ban status, last login/logout, online indicator |
| 🔨 | **Ban/Unban Toggle** | Timed (1h, 24h) or permanent bans with reason — instant socket disconnect |
| 🗑️ | **Soft Delete Users** | Marks `is_deleted = true`, force-disconnects via socket, blocks future login |
| 📜 | **Paginated Audit Logs** | Every login, logout, ban, and admin action logged with IP + User-Agent |
| 📤 | **Audit Log Export** | Export endpoint scaffolded at `GET /api/admin/audit-logs/export` |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🏗️ Tech Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                        F R O N T E N D                          │
│                                                                 │
│  React 18.2 ─── Vite 5.2 ─── React Router 6.23                │
│  Zustand 4.5 ── Socket.IO Client 4.7 ── Axios 1.13            │
│  TailwindCSS 3.4 ── DaisyUI 4.10 ── React Hot Toast 2.4       │
│  React Icons 5.2 ── Inter Font (Google Fonts)                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                        B A C K E N D                            │
│                                                                 │
│  Node.js 18 ─── Express 4.19 ─── Socket.IO 4.7                │
│  @supabase/supabase-js 2.99 ── JSON Web Token 9.0              │
│  bcryptjs 2.4 ── express-validator 7.3 ── Helmet 8.1           │
│  express-rate-limit 8.3 ── Morgan 1.10 ── Winston 3.19         │
│  Nodemailer 8.0 ── cookie-parser 1.4                           │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                  I N F R A S T R U C T U R E                    │
│                                                                 │
│  Docker Compose 3.8 ─── Nginx (Alpine) ─── Node 18 Alpine     │
│  Supabase (Hosted PostgreSQL) ── uuid-ossp Extension           │
│  Multi-stage Dockerfile ── Bridge Network                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🔀 Architecture Overview

```
┌──────────────┐         ┌─────────────────┐        ┌──────────────────┐
│              │  :80    │                 │  :5000  │                  │
│   Browser    │────────▶│   Nginx         │────────▶│  Express Server  │
│   (React)    │◀────────│   (Reverse      │◀────────│                  │
│              │         │    Proxy)        │        │  ┌──────────────┐│
│  ┌────────┐  │         │                 │        │  │ Socket.IO    ││
│  │Zustand │  │         │  location /     │        │  │ Server       ││
│  │ Store  │  │         │  → static SPA   │        │  └──────┬───────┘│
│  └────────┘  │         │                 │        │         │        │
│  ┌────────┐  │   WS    │  location /api/ │        │  ┌──────▼───────┐│
│  │Socket  │──┼────────▶│  → proxy :5000  │        │  │ Controllers  ││
│  │Context │◀─┼────────▶│                 │        │  │ auth│msg│adm ││
│  └────────┘  │         │  location       │        │  └──────┬───────┘│
│  ┌────────┐  │         │  /socket.io/    │        │         │        │
│  │ Auth   │  │         │  → WS proxy     │        │  ┌──────▼───────┐│
│  │Context │  │         │                 │        │  │  Supabase    ││
│  └────────┘  │         └─────────────────┘        │  │  (Postgres)  ││
│  ┌────────┐  │                                    │  └──────────────┘│
│  │ Axios  │──┼── Bearer Token (Authorization) ───▶│  ┌──────────────┐│
│  │Instance│  │                                    │  │  Middleware   ││
│  └────────┘  │◀── httpOnly Cookie (refreshToken)──│  │  protect│ban ││
│              │                                    │  │  admin│rate  ││
└──────────────┘                                    │  └──────────────┘│
                                                    └──────────────────┘

Auth Flow:
  Login/Signup ──▶ Server issues accessToken (body) + refreshToken (cookie)
       │
       ▼
  Axios attaches Bearer token to every request
       │
       ▼
  401 received? ──▶ Interceptor calls POST /api/auth/refresh
       │                    │
       ▼                    ▼
  New token? ──Yes──▶ Retry original request
       │
       No ──▶ Clear auth state ──▶ Redirect to /login
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📂 Project Structure

```
Chat_App-main/
├── backend/
│   ├── config/
│   │   └── supabase.js              # Supabase client initialization
│   ├── controllers/
│   │   ├── auth.controller.js        # Signup, login, logout, refresh, verify, reset
│   │   ├── message.controller.js     # Send, get messages, create group, unread counts
│   │   ├── user.controller.js        # Sidebar user list (excludes self)
│   │   └── admin.controller.js       # Stats, user mgmt, audit logs, ban/delete
│   ├── middleware/
│   │   ├── protectRoute.js           # JWT verification (Bearer + cookie fallback)
│   │   ├── isAdmin.js                # Role-based admin gate
│   │   ├── checkBanned.js            # Ban check with auto-expiry for timed bans
│   │   ├── rateLimiters.js           # 4 rate limiters: API, login, signup, AI
│   │   ├── validate.js               # express-validator result handler
│   │   └── errorHandler.js           # Global error handler with Winston logging
│   ├── routes/
│   │   ├── auth.routes.js            # 9 auth endpoints with per-route validation
│   │   ├── message.routes.js         # Message CRUD + group creation
│   │   ├── user.routes.js            # GET /api/users (sidebar)
│   │   └── admin.routes.js           # 6 admin endpoints (all require protectRoute + isAdmin)
│   ├── socket/
│   │   └── socket.js                 # Socket.IO server, JWT auth, presence, receipts
│   ├── utils/
│   │   ├── generateToken.js          # Dual JWT generator (access + refresh cookie)
│   │   ├── logger.js                 # Winston logger (file + console transports)
│   │   └── sendEmail.js              # Nodemailer transport with mock fallback
│   ├── config.js                     # dotenv loader + __dirname polyfill
│   └── server.js                     # Express app bootstrap, HTTPS enforcement
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js       # Axios with auto-refresh interceptors
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Auth state, token refresh, /me verification
│   │   │   └── SocketContext.jsx      # Socket.IO connection lifecycle + events
│   │   ├── zustand/
│   │   │   └── useConversation.js     # Selected conversation + messages store
│   │   ├── hooks/
│   │   │   ├── useLogin.js            # Login API call
│   │   │   ├── useSignup.js           # Signup with validation
│   │   │   ├── useLogout.js           # Logout + clear state
│   │   │   ├── useSendMessage.js      # POST message to conversation
│   │   │   ├── useGetMessages.js      # Fetch message history
│   │   │   ├── useListenMessages.js   # Listen for newMessage socket events
│   │   │   ├── useGetConversations.js # Load sidebar conversations
│   │   │   ├── useCreateGroup.js      # Group creation API
│   │   │   ├── useUnreadCounts.js     # Fetch + poll unread message counts
│   │   │   ├── useAvailabilityCheck.js# Real-time username availability
│   │   │   ├── useGetUsers.js         # Admin: fetch all users
│   │   │   ├── useGetAuditLogs.js     # Admin: paginated audit logs
│   │   │   ├── useGetDashboardStats.js# Admin: dashboard statistics
│   │   │   ├── useToggleBan.js        # Admin: ban/unban user
│   │   │   └── useDeleteUser.js       # Admin: soft-delete user
│   │   ├── components/
│   │   │   ├── messages/
│   │   │   │   ├── MessageContainer.jsx # Chat panel with header + messages + input
│   │   │   │   ├── Messages.jsx        # Scrollable message list with auto-scroll
│   │   │   │   ├── Message.jsx          # Individual message bubble with status
│   │   │   │   └── MessageInput.jsx     # Text input with send action
│   │   │   ├── sidebar/
│   │   │   │   ├── Sidebar.jsx          # Sidebar container with search + list
│   │   │   │   ├── Conversations.jsx    # Conversation list renderer
│   │   │   │   ├── Conversation.jsx     # Single conversation item with avatar
│   │   │   │   ├── SearchInput.jsx      # User search filter
│   │   │   │   ├── CreateGroupModal.jsx # Multi-select group creation modal
│   │   │   │   └── LogoutButton.jsx     # Logout action button
│   │   │   ├── skeletons/
│   │   │   │   ├── AppSkeleton.jsx      # Full-app loading skeleton
│   │   │   │   ├── ConversationSkeleton.jsx
│   │   │   │   └── MessageSkeleton.jsx
│   │   │   ├── Avatar.jsx              # Smart avatar component with fallback
│   │   │   ├── ProtectedRoute.jsx      # Auth guard redirect
│   │   │   └── AdminRoute.jsx          # Auth + admin role guard
│   │   ├── pages/
│   │   │   ├── home/Home.jsx           # Main chat interface (sidebar + messages)
│   │   │   ├── login/Login.jsx         # Login form
│   │   │   ├── signup/SignUp.jsx        # Signup form with live username check
│   │   │   ├── signup/GenderCheckbox.jsx# Gender selection component
│   │   │   ├── admin/AdminDashboard.jsx # Admin panel (users + audit logs tabs)
│   │   │   ├── forgot-password/ForgotPassword.jsx
│   │   │   └── reset-password/ResetPassword.jsx
│   │   ├── utils/
│   │   │   ├── extractTime.js          # Timestamp formatter for message bubbles
│   │   │   └── emojis.js              # Emoji utility set
│   │   ├── App.jsx                     # Route definitions + lazy loading
│   │   ├── main.jsx                    # React DOM entry point
│   │   └── index.css                   # Global styles + glassmorphism base
│   ├── tailwind.config.js              # Custom "chatdark" DaisyUI theme
│   ├── vite.config.js                  # Vite dev server + proxy config
│   └── index.html                      # SPA entry with Inter font + meta tags
│
├── docker-compose.yml                  # Multi-container orchestration
├── Dockerfile.backend                  # Node 18 Alpine production build
├── Dockerfile.frontend                 # Multi-stage: Vite build → Nginx serve
├── nginx.conf                          # Reverse proxy + WebSocket upgrade + gzip
├── supabase_schema.sql                 # Complete database schema (6 tables)
├── .env.example                        # Root environment variables template
└── PROJECT_RULES.md                    # GSD methodology coding standards
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **Docker** & **Docker Compose** (for containerised deployment)
- A **Supabase** project (free tier works)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Diganta18-noob/Realtime-chat-app.git
cd Realtime-chat-app/Chat_App-main
```

### 2️⃣ Set Up Environment Variables

**Backend** — copy and fill `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
JWT_SECRET=your_super_secret_jwt_string
JWT_REFRESH_SECRET=your_super_secret_refresh_string
CLIENT_URL=http://localhost:3000
SMTP_HOST=your_smtp_host           # Optional — falls back to console logging
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

**Frontend** — copy and fill `frontend/.env.example`:

```bash
cp frontend/.env.example frontend/.env
```

```env
VITE_BACKEND_URL=http://localhost:5000/api
```

**Root** — copy and fill `.env.example` (used by Docker):

```bash
cp .env.example .env
```

### 3️⃣ Set Up Supabase Database

Run the full schema in your Supabase SQL Editor:

```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with auth, banning, email verification, and password reset
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  email TEXT DEFAULT NULL,
  password TEXT NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  profile_pic TEXT DEFAULT '',
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_banned BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  is_email_verified BOOLEAN DEFAULT false,
  email_verification_token TEXT DEFAULT NULL,
  email_verification_expires TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  reset_password_token TEXT DEFAULT NULL,
  reset_password_expires TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  banned_until TIMESTAMP WITH TIME ZONE DEFAULT NULL,
  ban_reason TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Conversations (DMs + Groups)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  is_group BOOLEAN DEFAULT false,
  group_name TEXT,
  group_admin UUID REFERENCES users(id) ON DELETE SET NULL,
  group_avatar TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Many-to-many bridge for conversation participants
CREATE TABLE IF NOT EXISTS conversation_participants (
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (conversation_id, user_id)
);

-- Messages with delivery status tracking
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Read receipt tracking
CREATE TABLE IF NOT EXISTS message_read_by (
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (message_id, user_id)
);

-- Comprehensive audit logging
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

### 4️⃣ Run Locally (Development)

```bash
# Install all dependencies (root + frontend)
npm run build

# Start the dev server (backend on :5000, frontend on :3000)
npm run dev
```

> The frontend Vite dev server proxies `/api` and `/socket.io` to the backend automatically.

### 5️⃣ Run with Docker (Production)

```bash
# Build and start all containers
npm run docker:up
# or
docker-compose up -d --build

# View logs
npm run docker:logs

# Tear down
npm run docker:down
```

| Container | Port | Purpose |
|---|---|---|
| `chatapp-frontend` | `:80` | Nginx serving React SPA + reverse proxy |
| `chatapp-backend` | `:5000` | Express API + Socket.IO server |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🔐 Authentication Flow

```
┌──────────────────────────────────────────────────────────────────────┐
│                         APP MOUNT                                    │
│                           │                                          │
│                   AuthContext initializes                             │
│                   isLoading = true                                    │
│                           │                                          │
│              ┌────────────▼────────────┐                             │
│              │  GET /api/auth/me       │                             │
│              │  (via axiosInstance)     │                             │
│              └────────────┬────────────┘                             │
│                           │                                          │
│               ┌───────────┴───────────┐                              │
│               ▼                       ▼                              │
│         ┌──────────┐          ┌──────────────┐                       │
│         │ 200 OK   │          │ 401 Expired  │                       │
│         └────┬─────┘          └──────┬───────┘                       │
│              │                       │                               │
│              │               ┌───────▼────────┐                      │
│              │               │ Interceptor:   │                      │
│              │               │ POST /refresh  │                      │
│              │               │ (httpOnly      │                      │
│              │               │  cookie sent)  │                      │
│              │               └───────┬────────┘                      │
│              │                       │                               │
│              │            ┌──────────┴──────────┐                    │
│              │            ▼                     ▼                    │
│              │     ┌────────────┐       ┌──────────────┐             │
│              │     │ New token  │       │ Refresh      │             │
│              │     │ received   │       │ failed       │             │
│              │     └─────┬──────┘       └──────┬───────┘             │
│              │           │                     │                     │
│              │    Retry /auth/me         ┌─────▼──────┐              │
│              │     with new token        │ Clear auth │              │
│              │           │               │ Redirect   │              │
│              ▼           ▼               │ to /login  │              │
│     ┌────────────────────────┐           └────────────┘              │
│     │ setAuthUser(userData)  │                                       │
│     │ isLoading = false      │                                       │
│     │ Render app routes      │                                       │
│     └────────────────────────┘                                       │
│                                                                      │
│  Token Storage:                                                      │
│  ├─ accessToken  → React state (memory only, never localStorage)    │
│  └─ refreshToken → httpOnly, Secure, SameSite=Strict cookie         │
│                                                                      │
│  Socket Auth:                                                        │
│  └─ accessToken passed via socket.handshake.auth.token              │
│     → Verified server-side with jwt.verify() in io.use() middleware │
└──────────────────────────────────────────────────────────────────────┘
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📡 Socket.IO Event Reference

### Client → Server

| Event | Payload | Description |
|---|---|---|
| `connection` | `{ auth: { token } }` | Handshake with JWT access token for authentication |
| `messages_read` | `{ senderId, receiverId }` | Mark all messages from sender as `read` |
| `disconnect` | — | Client disconnects; user removed from online map |

### Server → Client

| Event | Payload | Description |
|---|---|---|
| `getOnlineUsers` | `string[]` (user IDs) | Broadcast updated online user list on connect/disconnect |
| `newMessage` | `{ _id, senderId, receiverId, conversationId, message, status, createdAt }` | New message pushed to recipient(s) in real time |
| `messages_delivered` | `{ by: userId, messageIds: string[] }` | Notifies sender that their messages were delivered |
| `messages_seen` | `{ by: userId, messageIds: string[] }` | Notifies sender that their messages were read |
| `newGroupCreated` | `{ _id, isGroup, groupName, groupAdmin, participants[] }` | New group conversation pushed to all participants |
| `banned` | `{ message: string }` | Admin ban notification — triggers force-disconnect |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🛡️ Admin Dashboard

The admin panel (`/admin`) is protected by both `protectRoute` and `isAdmin` middleware and features two main tabs:

### 👥 Users Tab

| Column | Source |
|---|---|
| Avatar + Full Name | `profile_pic`, `full_name` |
| Username | `username` |
| Role | `role` (`user` / `admin`) |
| Status | Live from `userSocketMap` (online/offline) |
| Ban Status | `is_banned`, `banned_until`, `ban_reason` |
| Last Login | Latest `LOGIN` / `ADMIN_LOGIN` from `audit_logs` |
| Last Logout | Latest `LOGOUT` from `audit_logs` |
| Created At | `created_at` |

**Actions:** Ban (1h / 24h / permanent with reason), Unban, Soft Delete — all with instant socket force-disconnect.

### 📜 Audit Logs Tab

| Column | Source |
|---|---|
| User | Joined from `users` table (avatar + name) |
| Action | `LOGIN`, `ADMIN_LOGIN`, `LOGOUT`, `USER_BANNED`, `USER_UNBANNED` |
| IP Address | `ip_address` from request |
| User Agent | `user_agent` from request headers |
| Details | Action context string |
| Timestamp | `created_at` |

Paginated (50 per page) with total count and page navigation.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🔒 Security Checklist

- [x] **Helmet.js** — Sets security HTTP headers (CSP, HSTS, X-Frame-Options, etc.)
- [x] **CORS whitelist** — Restricted to `CLIENT_URL` origin only
- [x] **httpOnly cookies** — Refresh tokens never accessible to JavaScript
- [x] **SameSite=Strict** — CSRF protection on refresh token cookie
- [x] **Secure flag** — Cookie sent over HTTPS only in production
- [x] **bcrypt hashing** — Passwords hashed with 10 salt rounds, never stored in plain text
- [x] **express-validator** — Input sanitization + validation on every endpoint
- [x] **XSS prevention** — `.escape()` applied to all user-supplied text fields
- [x] **Rate limiting** — 4 tiers: API (100/15min), Login (5/15min), Signup (3/1hr), AI (10/day)
- [x] **Request size limit** — `express.json({ limit: "10kb" })` prevents payload bombs
- [x] **JWT expiration** — Access tokens expire in 15 minutes, refresh in 24 hours
- [x] **IDOR mitigation** — Group message endpoints verify sender is a participant
- [x] **Admin protection** — All admin routes gated behind `isAdmin` middleware
- [x] **Ban enforcement** — Checked at login and before sending messages
- [x] **Timed ban auto-expiry** — `checkBanned` middleware auto-lifts expired temp bans
- [x] **Soft delete** — Users marked deleted, not purged, preserving referential integrity
- [x] **Anti-enumeration** — Forgot-password returns identical response for valid/invalid emails
- [x] **HTTPS enforcement** — Production server redirects HTTP → HTTPS via `X-Forwarded-Proto`
- [x] **Socket authentication** — JWT verified in `io.use()` middleware before connection
- [x] **Nginx gzip** — Response compression for all text-based content types
- [x] **Structured logging** — Winston logs errors with timestamp, IP, and stack traces  
- [x] **Morgan integration** — HTTP request logs streamed into Winston for unified logging
- [x] **Trust proxy** — `app.set("trust proxy", 1)` for correct IP detection behind Nginx

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🐳 Docker Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Host Machine                          │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │           chatapp-network (bridge)               │    │
│  │                                                  │    │
│  │  ┌──────────────────┐   ┌───────────────────┐   │    │
│  │  │  chatapp-frontend │   │  chatapp-backend  │   │    │
│  │  │                  │   │                   │   │    │
│  │  │  Nginx (Alpine)  │   │  Node.js 18       │   │    │
│  │  │                  │   │  (Alpine)         │   │    │
│  │  │  Stage 1: Vite   │   │                   │   │    │
│  │  │  build (builder) │   │  Express +        │   │    │
│  │  │                  │   │  Socket.IO        │   │    │
│  │  │  Stage 2: Nginx  │   │                   │   │    │
│  │  │  serves /dist    │──▶│  :5000            │   │    │
│  │  │                  │   │                   │   │    │
│  │  │  :80 ◀── public  │   │  env_file: .env   │   │    │
│  │  │                  │   │  NODE_ENV=prod    │   │    │
│  │  │  Proxy rules:    │   │                   │   │    │
│  │  │  /api/ → :5000   │   │  restart:         │   │    │
│  │  │  /socket.io/     │   │  unless-stopped   │   │    │
│  │  │  → :5000 (WS)    │   │                   │   │    │
│  │  │                  │   └───────────────────┘   │    │
│  │  │  depends_on:     │                           │    │
│  │  │   - backend      │                           │    │
│  │  │                  │                           │    │
│  │  │  restart:        │                           │    │
│  │  │  unless-stopped  │                           │    │
│  │  └──────────────────┘                           │    │
│  │                                                  │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  External:                                              │
│  └── Supabase (Hosted PostgreSQL) ◀── SUPABASE_URL     │
│                                                         │
└─────────────────────────────────────────────────────────┘

Port Mapping:
  Host :80   ──▶  Frontend container :80  (Nginx)
  Host :5000 ──▶  Backend container :5000 (Express)
```

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🗺️ Roadmap

| | Feature | Description |
|---|---|---|
| 📎 | **File & Image Sharing** | Upload and send images, documents, and media in conversations |
| ✏️ | **Message Edit & Delete** | Edit sent messages within a time window, or delete for everyone |
| ⌨️ | **Typing Indicators** | Real-time "user is typing…" status via Socket.IO events |
| 🔔 | **Push Notifications** | Browser push notifications for messages received while tab is inactive |
| 🎨 | **Theme Customization** | User-selectable color themes beyond the default dark mode |
| 🔍 | **Message Search** | Full-text search across conversation history with highlighted results |
| 👤 | **User Profiles** | Editable profile pages with bio, status message, and avatar upload |
| 🌐 | **i18n / Localization** | Multi-language support for the entire interface |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 🤝 Contributing

Contributions are welcome! This project follows the **GSD (Get Shit Done)** methodology — see [`PROJECT_RULES.md`](PROJECT_RULES.md) for full coding standards.

### Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/Realtime-chat-app.git

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Make changes and verify (empirical proof required — see PROJECT_RULES.md)

# 4. Commit with conventional format
git commit -m "feat(scope): add your feature description"

# 5. Push and open a Pull Request
git push origin feat/your-feature-name
```

### Commit Types

| Type | Usage |
|---|---|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code restructure (no behavior change) |
| `test` | Adding or updating tests |
| `chore` | Maintenance, dependencies |

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<div align="center">

**Built with 💜 and too much caffeine.**

Made by [Diganta18-noob](https://github.com/Diganta18-noob)

</div>
