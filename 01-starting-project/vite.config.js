import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This makes the dev server listen on your local IP
    port: 3000, // You can change this to any port you prefer
  },
})