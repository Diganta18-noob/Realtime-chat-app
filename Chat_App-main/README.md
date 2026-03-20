<!-- ANIMATED WAVE HEADER -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=ChatApp&fontSize=90&fontColor=a78bfa&animation=fadeIn&fontAlignY=40&desc=Where+conversations+happen+at+the+speed+of+thought&descAlignY=62&descAlign=50&descColor=c4b5fd&descSize=20" width="100%"/>
</p>

<!-- TYPING ANIMATION -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=20&duration=2800&pause=900&color=A78BFA&center=true&vCenter=true&multiline=true&repeat=true&width=750&height=110&lines=⚡+Real-time+messaging+powered+by+Socket.IO;🔐+Supabase+Auth+with+secure+httpOnly+cookies;🛡️+Admin+Dashboard+with+full+Audit+Logs;🐳+Fully+Dockerized+%7C+Production+Ready" alt="Typing SVG" />
</p>

<br/>

<!-- BADGES ROW 1 — STACK -->
<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white"/>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>
</p>

<!-- REPO STATS -->
<p align="center">
  <img src="https://img.shields.io/github/stars/Diganta18-noob/Realtime-chat-app?style=flat-square&color=7c3aed&label=⭐%20Stars"/>
  <img src="https://img.shields.io/github/forks/Diganta18-noob/Realtime-chat-app?style=flat-square&color=7c3aed&label=🍴%20Forks"/>
  <img src="https://img.shields.io/github/issues/Diganta18-noob/Realtime-chat-app?style=flat-square&color=7c3aed&label=🐛%20Issues"/>
  <img src="https://img.shields.io/github/last-commit/Diganta18-noob/Realtime-chat-app?style=flat-square&color=7c3aed&label=📅%20Last%20Commit"/>
  <img src="https://img.shields.io/github/languages/top/Diganta18-noob/Realtime-chat-app?style=flat-square&color=7c3aed"/>
</p>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 What Is ChatApp?

<img align="right" src="https://media.giphy.com/media/L1R1tvI9svkIWwpVYr/giphy.gif" width="260" alt="coding"/>

> A **cinematic, production-grade real-time messaging platform** built for modern communication. Engineered with a dark glassmorphism aesthetic — deep navy, cosmic purple, and night-sky depth — this is a complete full-stack architecture study with security that would fit a professional product.

Not just another chat app. This ships with:

- 🔐 **Supabase Auth** — `httpOnly` cookies, zero `localStorage` exposure
- ⚡ **Socket.IO** — sub-100ms real-time message delivery
- 👁️ **WhatsApp-style** read receipts, unread badges, online presence
- 🛡️ **Admin Dashboard** — user management + paginated audit logs
- 🎨 **DiceBear Avatars** — unique per username, no uploads needed
- 🔍 **Live Duplicate Check** — 500ms debounced Supabase query on signup
- 🐳 **Docker + Nginx** — reverse proxy, healthchecks, SPA routing

<br clear="right"/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Features

<div align="center">

### 💬 Core Messaging

| | Feature | Description |
|---|---|---|
| ⚡ | **Real-Time DMs** | Instant private messaging via Socket.IO WebSockets |
| ✓✓ | **Read Receipts** | Single ✓ sent · double ✓✓ delivered · blue ✓✓ read |
| 🔴 | **Unread Badges** | Live count badge — auto-increments, resets on open |
| 🟢 | **Online Presence** | Real-time online/offline per user via socket presence |
| 🔍 | **Live Search** | Debounced sidebar filtering — instant results as you type |
| 🎨 | **DiceBear Avatars** | Auto-generated unique avatar per username |

### 🔐 Auth & Security

| | Feature | Description |
|---|---|---|
| 🍪 | **Secure Cookies** | Token in `httpOnly` cookie — never readable by JS |
| 🔄 | **Silent Refresh** | Supabase auto-refreshes tokens transparently |
| 🚫 | **Mount Validation** | Session verified with Supabase on every app start |
| 🛡️ | **Protected Routes** | Loading gate — zero flash of unauthenticated content |
| 👤 | **Role-Based Access** | `user` / `admin` with separate route guards |
| 🔏 | **RLS Policies** | Supabase Row Level Security on all tables |

### 🛠️ Admin Dashboard

| | Feature | Description |
|---|---|---|
| 👥 | **User Management** | All users, roles, online status, last login/logout |
| 📋 | **Audit Logs** | Paginated: LOGIN · LOGOUT · ADMIN_LOGIN events |
| ⏱️ | **Timestamps** | Precise per-event time + IP address tracking |
| 🔘 | **Status Toggles** | Activate / deactivate users instantly |

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Tech Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,postgres,docker,nginx,git,js&perline=5&theme=dark"/>
</p>

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND                               │
│   React 18  ·  Vite  ·  Tailwind CSS  ·  Socket.IO Client      │
│   Supabase JS  ·  React Router v6  ·  DiceBear Avatars          │
├─────────────────────────────────────────────────────────────────┤
│                          BACKEND                                │
│   Node.js  ·  Express  ·  Socket.IO  ·  Supabase Auth           │
│   PostgreSQL (Supabase)  ·  Row Level Security  ·  Helmet        │
├─────────────────────────────────────────────────────────────────┤
│                       INFRASTRUCTURE                            │
│   Docker  ·  Docker Compose  ·  Nginx  ·  Supabase Cloud        │
└─────────────────────────────────────────────────────────────────┘
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                    CLIENT  (React + Vite)                        │
│                                                                  │
│  AuthContext ──► supabase.auth.onAuthStateChange()               │
│       │              loading: true until session resolves        │
│  SocketContext ──► io() connects ONLY after user confirmed       │
│  ProtectedRoute ──► loading gate ──► user ──► role check         │
└──────────────────────────┬───────────────────────────────────────┘
                           │  HTTPS + WSS
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│                   NGINX  (Docker :3000→:80)                      │
│   /api        ──►  proxy → Express :5000                         │
│   /socket.io  ──►  proxy → Express :5000  (WS upgrade)           │
│   /*          ──►  React SPA  (try_files index.html)             │
└──────────────┬───────────────────────────────────────────────────┘
               │
   ┌───────────┴───────────────────────────────────┐
   ▼                                               ▼
┌───────────────────────┐        ┌─────────────────────────────────┐
│   EXPRESS  :5000      │        │        SUPABASE CLOUD           │
│                       │        │                                 │
│  authMiddleware       │◄─JWT───│  Auth  (httpOnly cookie)        │
│  socket handlers      │        │  PostgreSQL + RLS               │
│  audit logger         │◄─RT────│  Realtime row subscriptions     │
│  rate limiter         │        │  Storage                        │
│  helmet + CORS        │        │                                 │
└───────────────────────┘        └─────────────────────────────────┘
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Project Structure

```
Realtime-chat-app/
│
├── 📁 Chat_App-main/
│   ├── 📁 frontend/                    # React + Vite
│   │   └── src/
│   │       ├── context/
│   │       │   ├── AuthContext.jsx         # Supabase session + loading gate
│   │       │   └── SocketContext.jsx       # Socket.IO lifecycle
│   │       ├── components/
│   │       │   ├── ProtectedRoute.jsx      # Role-aware route guard
│   │       │   ├── Avatar.jsx              # DiceBear auto-avatar
│   │       │   └── MessageTick.jsx         # ✓ ✓✓ read receipt ticks
│   │       ├── hooks/
│   │       │   └── useAvailabilityCheck.js # 500ms debounced checker
│   │       └── pages/
│   │           ├── Login.jsx
│   │           ├── Register.jsx            # Real-time duplicate check
│   │           ├── ForgotPassword.jsx      # Password reset flow
│   │           ├── ResetPassword.jsx       # Token-based reset
│   │           ├── ChatPage.jsx            # Main messaging UI
│   │           └── AdminDashboard.jsx      # Users + Audit Logs
│   │
│   ├── 📁 backend/                     # Node.js + Express
│   │   ├── middleware/
│   │   │   └── authMiddleware.js           # Supabase JWT verification
│   │   ├── routes/
│   │   │   ├── auth.js                     # login · register · /me
│   │   │   ├── messages.js                 # CRUD + unread counts
│   │   │   └── admin.js                    # Admin-only routes
│   │   └── server.js                       # Express + helmet + CORS
│   │
│   ├── 🐳 Dockerfile.frontend
│   ├── 🐳 Dockerfile.backend
│   ├── 🐳 docker-compose.yml
│   ├── ⚙️  nginx.conf
│   └── 🔒 .env / .env.example
│
├── 📋 PROJECT_RULES.md
└── 📖 README.md
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Getting Started

### Prerequisites

```bash
node    >= 18.0.0
npm     >= 9.0.0
docker  >= 24.0.0
```

### 1 · Clone

```bash
git clone https://github.com/Diganta18-noob/Realtime-chat-app.git
cd Realtime-chat-app/Chat_App-main
```

### 2 · Environment Variables

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:5000

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # backend only — NEVER frontend
JWT_SECRET=your_supabase_jwt_secret
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` bypasses all RLS. Never expose it client-side.

### 3 · Supabase SQL Setup

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username varchar(24) not null unique,
  role text default 'user' check (role in ('user','admin')),
  created_at timestamptz default now()
);

create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  sender uuid references public.profiles(id) on delete cascade not null,
  receiver uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  status text default 'sent' check (status in ('sent','delivered','read')),
  created_at timestamptz default now()
);

create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  action text not null,
  performed_by uuid references public.profiles(id),
  ip_address text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.audit_logs enable row level security;
alter publication supabase_realtime add table public.messages;
```

### 4 · Run with Docker 🐳

```bash
docker-compose up --build
# Frontend → http://localhost:3000
# Backend  → http://localhost:5000

docker-compose down        # stop
docker-compose down -v     # stop + wipe volumes
```

### 5 · Run Locally

```bash
# Terminal 1
cd backend && npm install && npm run dev

# Terminal 2
cd frontend && npm install && npm run dev
```

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Auth Flow

```
App mounts → AuthContext → loading: true
        │
        ▼
supabase.auth.getSession() ◄── reads httpOnly cookie
        │
   ┌────┴──────────────────────┐
   │                           │
Valid session             No session / expired
   │                           │
   ▼                           ▼
setUser(data)           setUser(null)
setLoading(false)       setLoading(false)
   │                           │
   ▼                           ▼
Stay on app             Redirect → /login

onAuthStateChange() always listening:
SIGNED_IN · SIGNED_OUT · TOKEN_REFRESHED · USER_UPDATED
```

<br/>

## 〔 ✦ 〕 Socket.IO Event Reference

<div align="center">

| Event | Direction | Payload | Description |
|---|---|---|---|
| `user_connected` | Client → Server | `userId` | Register user on connect |
| `join_room` | Client → Server | `roomId` | Join a private chat room |
| `send_message` | Client → Server | `{ receiverId, content }` | Send a message |
| `receive_message` | Server → Client | message object | Incoming message |
| `messages_read` | Client → Server | `{ senderId, receiverId }` | Chat opened |
| `messages_seen` | Server → Client | `{ by, messageIds }` | Notify sender of read |
| `online_users` | Server → Client | `userId[]` | Broadcast presence list |

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Security Checklist

<div align="center">

| ✅ | Implemented |
|:---:|---|
| ✅ | Tokens in `httpOnly` cookies — never `localStorage` |
| ✅ | Supabase JWT verified server-side on every protected request |
| ✅ | Service role key in backend `.env` only — never client-side |
| ✅ | Row Level Security on all Supabase tables |
| ✅ | Rate limiting on `/api/auth` routes |
| ✅ | `helmet` HTTP security headers on Express |
| ✅ | CORS locked to specific origin only |
| ✅ | Unique DB constraint on `username` — race-condition safe |
| ✅ | Socket.IO auth middleware verifies JWT before connection |
| ✅ | `trust proxy` set for Docker/Nginx environments |

</div>

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Roadmap

- [ ] 🖼️ Image and file sharing in chat
- [ ] 👥 Group chat rooms
- [ ] 🔔 Push notifications (PWA)
- [ ] 🔍 Global message search
- [ ] 😄 Emoji reactions on messages
- [ ] 🗑️ Admin: delete messages + timed user bans
- [ ] 📊 Analytics — active users graph, messages per hour heatmap
- [ ] 🌐 Deploy: Vercel (frontend) + Railway (backend)

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<br/>

## 〔 ✦ 〕 Contributing

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add your feature"
git push origin feature/your-feature-name
# then open a Pull Request
```

Read `PROJECT_RULES.md` before contributing.

<br/>

<img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%">

<!-- ANIMATED FOOTER -->
<div align="center">

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=15&duration=4000&pause=2000&color=7C3AED&center=true&vCenter=true&width=500&lines=Built+with+obsession+by+Diganta;LTIMindtree+·+Hyderabad+·+2026;⭐+Star+this+repo+if+it+helped+you" alt="Footer" />

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
