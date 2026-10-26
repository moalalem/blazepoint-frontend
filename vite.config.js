import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // هذا السطر هو الأهم ليعمل الموقع على الدومين المخصص
  plugins: [react()],
  server: {
    allowedHosts: ['.trycloudflare.com']
  }
})