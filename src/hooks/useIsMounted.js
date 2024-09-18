import { useEffect, useState } from 'react';

// 기본 값 0.1초
function useIsMounted(delay = 100) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return isMounted;
}

export default useIsMounted;
