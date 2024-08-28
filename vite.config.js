import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import pluginReact from '@vitejs/plugin-react';

const viteConfig = defineConfig({
  // 기본 경로 설정
  base: '/',
  // public 폴더 설정
  publicDir: 'public',
  // 개발 서버 설정
  server: {
    host: 'localhost',
    port: 3000,
    open: false,
  },
  // Vite 플러그인 배열을 정의
  plugins: [
    // React 플러그인을 추가
    pluginReact({
      // jsxRuntime 옵션을 automatic으로 설정. React 17의 새로운 JSX 변환 방식을 사용
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    // 모듈 경로 별칭 설정
    alias: {
      // @ => ./src
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});

export default viteConfig;
