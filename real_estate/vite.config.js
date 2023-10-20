import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: './real_estate-privateKey.key',
      cert: './real_estate.crt',
    } 
  },
  plugins: [react()],
})
