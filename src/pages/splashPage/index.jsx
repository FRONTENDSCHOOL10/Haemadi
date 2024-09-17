import { createPortal } from 'react-dom';
import styles from './SplashPage.module.css';

function SplashPage() {
  const portal = document.getElementById('portal');
  return createPortal(
    <div className={styles.splashPage}>
      <span className="sr-only">Splash Screen</span>
    </div>,
    portal
  );
}

export default SplashPage;
