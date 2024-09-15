import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './router';
import { useDesktopDetector } from './stores/mediaStore';
import ToasterProvider from '@/components/ToasterProvider/ToasterProvider';

function App() {
  useDesktopDetector(); // 640px 기준으로 desktop 상태관리

  return (
    <HelmetProvider>
      <ToasterProvider>
        <AppRouter />
      </ToasterProvider>
    </HelmetProvider>
  );
}

export default App;
