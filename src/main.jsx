import '@/styles/main.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Button from './components/Button/Button';

const container = document.getElementById('root');

const onClick = () => console.log('안녕');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
      <Button type="normal" state="disabled" onClick={onClick}>
        가입
      </Button>
    </StrictMode>
  );
} else {
  console.warn('문서에 "#react-app" 요소가 존재하지 않습니다.');
}
