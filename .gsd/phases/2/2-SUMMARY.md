# Plan 2.2 Summary
- Upgraded `AuthContext.jsx` with `accessToken` in memory and `refreshAccessToken()` for silent renewal
- Updated `SocketContext.jsx` to pass `auth.token` in Socket.io handshake, using relative URL
- Rewrote all 6 hooks (`useLogin`, `useSignup`, `useLogout`, `useGetMessages`, `useSendMessage`, `useGetConversations`) to send `Authorization: Bearer` headers and auto-refresh on 401
