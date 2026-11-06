import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site under /<repo>/ (set by the deploy workflow);
  // local dev and preview stay at /.
  base: process.env.BASE_PATH || '/',
  server: {
    port: 3000,
    host: true
  }
});
