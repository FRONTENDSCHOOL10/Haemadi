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
      {showSplash ? <SplashPage /> : <AppRouter />}
    </HelmetProvider>
  );
}

export default App;
