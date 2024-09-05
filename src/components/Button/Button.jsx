import { memo } from 'react';
import { node, oneOf, func } from 'prop-types';

import styles from './Button.module.css';

// props type 정의
Button.propTypes = {
  children: node.isRequired,
  type: oneOf(['normal', 'angled', 'stroke']),
  state: oneOf(['default', 'primary', 'disabled']),
  onClick: func,
};

// Button Component
function Button({
  children,
  type = 'normal',
  state = 'default',
  onClick,
  ...restProps
}) {
  const classNames = `${styles[type]} ${styles[state]}`;

  const handleClick = (event) => {
    if (state === 'disabled') {
      // 클릭을 막음
      event.preventDefault();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type="button"
      className={classNames}
      aria-disabled={state === 'disabled'}
      onClick={handleClick}
      {...restProps}
    >
      <span>{children}</span>
    </button>
  );
}

export default memo(Button);
