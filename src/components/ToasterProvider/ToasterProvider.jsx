import { oneOf, string, func, node } from 'prop-types';

import styles from './ToasterProvider.module.css';
import { ToasterStore } from '@/stores/ToasterStore';
import useIsMounted from '@/hooks/useIsMounted';
import icons from '@/icons';
import SVGIcon from '@/components/SVGIcon/SVGIcon';

const ICONS = {
  info: icons.check,
  warn: null,
};

Toast.propTypes = {
  type: oneOf(['info', 'warn']),
  message: string.isRequired,
  onClick: func,
};

function Toast({ type, message, onClick }) {
  const isMounted = useIsMounted(100);
  const icon = ICONS[type];
  const className = `${styles.Toast} ${styles[type]} ${
    isMounted ? styles.mounted : ''
  }`;

  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      onClick={onClick}
    >
      {icon && <SVGIcon className={styles.Icon} {...icon} color="#fff" />}
      {message}
    </div>
  );
}

ToasterProvider.propTypes = {
  children: node,
};

function ToasterProvider({ children }) {
  const { toasts, removeToast } = ToasterStore((state) => ({
    toasts: state.toasts,
    removeToast: state.removeToast,
  }));

  return (
    <div>
      {children}
      <div className={styles.ToastContainer}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            onClick={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default ToasterProvider;
