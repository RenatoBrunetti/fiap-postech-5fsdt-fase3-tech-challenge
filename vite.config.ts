import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://api:3000',
        changeOrigin: true,
        secure: false, // Pode ser necessário dependendo da sua configuração
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove o '/api' do path antes de enviar ao backend
      },
    },
    host: true, // Allows access from outside the container
    port: 5173, // Consistent development port
    // strictPort: true, // Ensures Vite fails if port is unavailable
    // watch: {
    //   usePolling: true, // Important for file change detection in Docker
    // },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
});
