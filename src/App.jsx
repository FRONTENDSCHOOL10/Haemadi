import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SplashPage from './pages/splashPage';
import AppRouter from './router';
import { useDesktopDetector } from './stores/mediaStore';

function App() {
  useDesktopDetector(); // 640px 기준으로 desktop 상태관리
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <HelmetProvider>
      {showSplash ? (
        <>
          <SplashPage />
          {/* 로딩 시작 알림 */}
          <div role="alert" aria-live="assertive" className="sr-only">
            곧 콘텐츠가 로드됩니다.
          </div>
        </>
      ) : (
        <>
          <AppRouter />
          {/* 로딩 완료 알림 */}
          <div aria-live="assertive" className="sr-only">
            콘텐츠가 로드되었습니다.
          </div>
        </>
      )}
    </HelmetProvider>
  );
}

export default App;
