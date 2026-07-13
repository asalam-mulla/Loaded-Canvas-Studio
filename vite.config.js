import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        // Manual chunking foundation — refined further in the Performance phase.
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});