import { getUserData } from '@/api/users';
import { parseJwt } from '@/utils';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

// 토큰 만료 여부 확인
/** @type {(token: string) => boolean} */
function checkTokenExpiration(token) {
  if (!token) return true;

  const decodedToken = parseJwt(token);
  const expirationTime = decodedToken.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
  const currentTime = Date.now();

  return currentTime > expirationTime;
}

/**
 * @typedef {Object} AuthStore
 * @property {string|null} token - JWT 토큰
 * @property {(token: string) => void} loginUser - 유저 로그인 시 토큰 저장
 * @property {() => void} logoutUser - 유저 로그아웃 시 토큰 삭제
 * @property {() => boolean} validateToken - 토큰이 유효한지 검사
 * @property {() => Promise<Object|null>} fetchUserInfo - 토큰이 유효하다면 유저정보 요청
 */

/** @type {() => AuthStore} */
export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        // 유저 로그인
        loginUser: (token) => set({ token }),
        // 유저 로그아웃
        logoutUser: () => set({ token: null }),
        // 토큰 유효성 검사
        validateToken: () => {
          const token = get().token;
          if (checkTokenExpiration(token)) {
            get().logoutUser(); // 토큰이 만료되었다면 로그아웃
            return false;
          }
          return true;
        },
        // 유저 정보 요청
        fetchUserInfo: async () => {
          const token = get().token;
          if (token) {
            const userInfo = await getUserData(token);
            return userInfo;
          }
          return null;
        },
      }),

      {
        name: 'authStore', // 로컬스토리지에 저장될 키 이름
        storage: createJSONStorage(() => localStorage), // 사용할 스토리지 선택
        partialize: (store) => ({ token: store.token }), // 로컬스토리지에 저장할 상태만 선택
      }
    ),

    { name: 'authStore' } // devtools에 표기될 저장소 이름
  )
);
