import { useEffect } from 'react';
import { create } from 'zustand';

const checkSunset = () => {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 18 || hours < 6;
};

// 스토어 정의
export const useSunStore = create((set) => ({
  sunset: false,
  updateSunset: () => set({ sunset: checkSunset() }),
}));

export const useSunsetDetector = () => {
  const updateSunset = useSunStore((store) => store.updateSunset);

  // 렌더링 후에 안전하게 상태를 업데이트 하도록 useEffect 사용
  useEffect(() => {
    updateSunset();
  }, [updateSunset]);
};
