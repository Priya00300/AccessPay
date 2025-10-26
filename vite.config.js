import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: 'happy-dom', // Use happy-dom instead of jsdom
    setupFiles: './tests/setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  }
})