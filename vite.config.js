import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so assets resolve on BOTH Render (root) and GitHub Pages (subpath).
  base: './',
  server: {
    port: 5173,
    open: true
  }
})
