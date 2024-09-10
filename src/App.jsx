import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './router';
import { useDesktopDetector } from './stores/mediaStore';

function App() {
  useDesktopDetector(); // 640px 기준으로 desktop 상태관리

  return (
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  );
}

export default App;
