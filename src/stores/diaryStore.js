import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useDiaryStore = create(
  persist(
    (set) => ({
      diary: { message: '', emotion: '', userId: '', replyId: '' },

      // diary 객체를 업데이트하는 함수
      setDiary: (newDiary) =>
        set((state) => ({
          diary: {
            ...state.diary, // 기존 diary 상태 유지
            ...newDiary, // 전달된 새로운 값만 덮어쓰기
          },
        })),
      resetDiary: () =>
        set({ diary: { message: '', emotion: '', userId: '', replyId: '' } }),
    }),
    {
      name: 'diaryStore', // 로컬스토리지에 저장될 키 이름
      storage: createJSONStorage(() => localStorage), // 사용할 스토리지 선택
    }
  )
);
