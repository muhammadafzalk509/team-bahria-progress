import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Repo name as base so assets resolve correctly on GitHub Pages.
  base: '/team-bahria-progress/',
  server: {
    port: 5173,
    open: true
  }
})
