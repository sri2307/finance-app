import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/restaurant/',
  server: {
    port: 3001, 
    proxy: {
      '/api': {
        target: 'https://d2ezff9rhb01hg.cloudfront.net',
        changeOrigin: true,
        secure: true, 
      }
    }
  }
})