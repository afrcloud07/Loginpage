import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  // Relative base so the build can be dropped into MikroTik hotspot folder
  base: './',
  build: {
    assetsDir: 'assets',
    // Keep a single CSS file to avoid filename collisions in multi-page build
    cssCodeSplit: false,
    rollupOptions: {
      // Multi-page build for MikroTik default endpoints
      // Output: login.html, alogin.html, redirect.html, logout.html, status.html, error.html
      input: {
        login: resolve(__dirname, 'login.html'),
        alogin: resolve(__dirname, 'alogin.html'),
        redirect: resolve(__dirname, 'redirect.html'),
        logout: resolve(__dirname, 'logout.html'),
        status: resolve(__dirname, 'status.html'),
        error: resolve(__dirname, 'error.html')
      },
      output: {
        // Keep filenames stable (no hashes) to simplify deploying to RouterOS
        // Multiple pages means multiple entry chunks; keep them stable:
        // assets/login.js, assets/status.js, etc.
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/chunk-[name].js',
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})
