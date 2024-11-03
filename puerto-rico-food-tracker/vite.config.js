import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Puerto-Rico-Food-Adventure-Tracker/',  // Note: Updated to match your exact repo name
  build: {
    outDir: '.',  // This will output to root instead of /dist
    emptyOutDir: false  // This prevents deleting other files
  }
})