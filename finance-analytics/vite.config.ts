import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/corporate/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://d2ezff9rhb01hg.cloudfront.net',
        changeOrigin: true,
        secure: true,
      },
     
    }
  }
})