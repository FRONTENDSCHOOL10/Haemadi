import { createPortal } from 'react-dom';
import styles from './SplashPage.module.css';

function SplashPage() {
  const portal = document.getElementById('portal');
  return createPortal(
    <div className={styles.splashPage}>
      <span className="sr-only">Splash Screen</span>
    </div>,
    portal // document.body 또는 다른 DOM 노드로 포탈 렌더링
  );
}

export default SplashPage;
