import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.css/,
            handler: "CacheFirst",
            options: {
              cacheName: "css-cache",
            },
          },
          {
            urlPattern: /.*\.js/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "js-cache",
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
});
