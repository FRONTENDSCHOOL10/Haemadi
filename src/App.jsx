import ToasterProvider from '@/components/ToasterProvider/ToasterProvider';
import { HelmetProvider } from 'react-helmet-async';
import SplashScreen from './components/SplashScreen/SplashScreen';
import AppRouter from './router';
import { useDesktopDetector } from './stores/mediaStore';

function App() {
  useDesktopDetector(); // 640px 기준으로 desktop 상태관리

  return (
    <>
      <SplashScreen />
      <HelmetProvider>
        <ToasterProvider>
          <AppRouter />
        </ToasterProvider>
      </HelmetProvider>
    </>
  );
}

export default App;
