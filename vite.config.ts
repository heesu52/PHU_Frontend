import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/oauth2': {
        target: 'https://fitee.site', // 리디렉션할 서버 주소
        changeOrigin: true, // 도메인이 다를 경우 CORS 이슈 해결
        secure:true,
        rewrite: (path) => path.replace(/^\/oauth2/, ''), // 요청 경로 수정
      },
    },
  },
})
