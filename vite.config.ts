import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
          'pages-admin': [
            './src/pages/admin/Dashboard.tsx',
            './src/pages/admin/Tools.tsx',
            './src/pages/admin/Categories.tsx',
            './src/pages/admin/Submissions.tsx',
            './src/pages/admin/Messages.tsx',
            './src/pages/admin/Users.tsx',
          ],
          'pages-static': [
            './src/pages/static/AboutPage.tsx',
            './src/pages/static/ContactPage.tsx',
            './src/pages/static/PrivacyPage.tsx',
            './src/pages/static/TermsPage.tsx',
          ],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: true,
  },
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  },
});
