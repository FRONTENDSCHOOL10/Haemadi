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

export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        token: null,
        userInfo: null,
        // 유저 로그인
        loginUser: (token, userInfo) => set({ token, userInfo }),
        // 유저 로그아웃
        logoutUser: () => set({ token: null, userInfo: null }),
        // 유저 정보 업데이트
        updateUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
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
          if (!get().validateToken()) return null;

          const token = get().token;
          try {
            const userInfo = await getUserData(token);
            set({ userInfo });
            return userInfo;
          } catch (error) {
            console.error('Failed to fetch user info:', error);
            return null;
          }
        },
        // 현재 인증 상태 확인 (토큰 유효성 검사 포함)
        checkSignIn: () => {
          return get().validateToken() && get().userInfo;
        },
      }),

      {
        name: 'authStore', // 로컬스토리지에 저장될 키 이름
        storage: createJSONStorage(() => localStorage), // 사용할 스토리지 선택
        partialize: (store) => ({
          token: store.token,
          userInfo: store.userInfo,
        }), // 로컬스토리지에 저장할 상태만 선택
      }
    ),

    { name: 'authStore' } // devtools에 표기될 저장소 이름
  )
);
