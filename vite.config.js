import { defineConfig } from 'vite'

export default defineConfig({
  // Base URL for GitHub Pages: github.com/YOUR_USERNAME/BMH-HMS
  // Change YOUR_USERNAME to your actual GitHub username below
  base: '/BMH-HMS/',

  root: 'src',

  build: {
    chunkSizeWarningLimit: 600,  // Firebase SDK is inherently ~543KB
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html'
      },
      output: {
        manualChunks: {
          'firebase-core': ['firebase/app', 'firebase/auth'],
          'firebase-db':   ['firebase/firestore', 'firebase/database'],
        }
      }
    }
  },

  server: {
    port: 3000,
    open: true
  }
})
