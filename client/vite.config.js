import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /.*\.css/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'css-cache',
            },
          },
          {
            urlPattern: /.*\.js/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'js-cache',
            },
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    include: ['react', 'react-dom'], 
  },
  server: {
    port: 3000, 
    open: true,
    proxy: {
      '/api': 'http://localhost:5000', // Định tuyến các yêu cầu API đến backend
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Alias để dễ dàng import các tệp từ thư mục `src`
    },
  },
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      plugins: [visualizer()],
    },
  },
});
