import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';


export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,           // listen tất cả IP
    port: 5173,           // port dev server
    strictPort: false,    // nếu port 5173 bị trùng, chọn port khác
    allowedHosts: ['.4viewsocial_client.com'], // cho phép host này và subdomain
  },
});
