import ToasterProvider from '@/components/ToasterProvider/ToasterProvider';
import { HelmetProvider } from 'react-helmet-async';
import useIsMounted from './hooks/useIsMounted';
import SplashPage from './pages/splashPage';
import AppRouter from './router';
import { useDesktopDetector } from './stores/mediaStore';

function App() {
  useDesktopDetector(); // 640px 기준으로 desktop 상태관리
  const showSplash = !useIsMounted(2000);

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
          <ToasterProvider>
            <AppRouter />
          </ToasterProvider>
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
