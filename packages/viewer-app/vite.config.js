import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import process from "process";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const API_URL = env.API_URL;
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          secure: API_URL.match(/https/) ? true : false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
