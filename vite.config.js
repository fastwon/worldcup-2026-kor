import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages 프로젝트 페이지(/worldcup-2026-kor/) 하위 경로 대응.
// 다른 호스팅(Vercel/Netlify, 루트 도메인)에 올릴 땐 base를 '/'로 바꾸세요.
export default defineConfig({
  base: '/worldcup-2026-kor/',
  plugins: [react()],
})
