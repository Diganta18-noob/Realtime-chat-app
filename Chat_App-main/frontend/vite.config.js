import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          socket: ['socket.io-client'],
        }
      }
    }
  },
  server: {
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
      },
      "/socket.io": {
        target: "http://127.0.0.1:5000",
        ws: true,
      },
    },
  },
});
