import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { create } from 'zustand';

const DESKTOP = { query: '(min-width: 640px)' };

// 스토어 정의
export const useMediaStore = create((set) => ({
  desktop: false,
  setDesktop: (value) => set({ desktop: value }),
}));

// 화면 크기 감지 및 상태 업데이트
export const useDesktopDetector = () => {
  const setDesktop = useMediaStore((store) => store.setDesktop);
  const desktop = useMediaQuery(DESKTOP);

  useEffect(() => {
    // 상태 업데이트는 렌더링 이후에 수행
    setDesktop(desktop);
  }, [desktop, setDesktop]); // desktop 값이 변경될 때만 업데이트
};
