import { useCallback } from 'react';

export default function useBodyScrollLock() {
  // 스크롤 비활성화
  const lockScroll = useCallback(() => {
    document.body.style.cssText = `
    position:fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;
    `;
  }, []);

  // 스크롤 활성화
  const openScroll = useCallback(() => {
    const scrollY = document.body.style.top;
    document.body.style.cssText = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }, []);

  return { lockScroll, openScroll };
}
