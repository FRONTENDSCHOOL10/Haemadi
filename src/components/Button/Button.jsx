import PropTypes from 'prop-types';

import styles from './Button.module.css';

// 기본 props 정의
Button.defaultProps = {
  type: 'normal',
  state: 'default',
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['normal', 'angled', 'stroke']),
  state: PropTypes.oneOf(['default', 'primary', 'disabled']),
  onClick: PropTypes.func,
};

function Button({ children, type = 'normal', state = 'default', onClick }) {
  const classNames = `${styles[type]} ${styles[state]}`;

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={state === 'disabled'}
      aria-disabled={state === 'disabled'}
    >
      <span>{children}</span>
    </button>
  );
}

export default Button;
