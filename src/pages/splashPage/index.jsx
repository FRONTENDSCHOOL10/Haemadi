import { createPortal } from 'react-dom';
import styles from './SplashPage.module.css';

function SplashPage() {
  const portal = document.getElementById('portal');
  return createPortal(
    <div className={styles.splashPage}>
      <h1 className="sr-only">Splash Screen</h1>
    </div>,
    portal
  );
}

export default SplashPage;
