import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or '
    port: 5173, // or your chosen port
    allowedHosts: ['https://cd3a07195e45.ngrok-free.app'],
     
  }
})
