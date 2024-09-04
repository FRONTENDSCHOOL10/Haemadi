import { memo } from 'react';
import { node, oneOf, func } from 'prop-types';

import styles from './Button.module.css';

// props type 정의
Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['normal', 'angled', 'stroke']),
  state: oneOf(['default', 'primary', 'disabled']),
};

// Button Component
function Button({
  children,
  type = 'normal',
  state = 'default',
  ...restProps
}) {
  const classNames = `${styles[type]} ${styles[state]}`;

  return (
    <button
      className={classNames}
      disabled={state === 'disabled'}
      aria-disabled={state === 'disabled'}
      {...restProps}
    >
      <span>{children}</span>
    </button>
  );
}

export default memo(Button);
