import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://52.200.3.27:8080", // 👈 your backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // keep /api
      },
    },
  },
});
