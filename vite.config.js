import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'url';  // Import fileURLToPath
import { dirname } from 'path';  // Import dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': dirname(fileURLToPath(import.meta.url)) + '/src',  // Use fileURLToPath and dirname to resolve the path
    },
  },
});
