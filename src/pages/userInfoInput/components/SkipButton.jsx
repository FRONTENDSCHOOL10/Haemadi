import { memo } from 'react';
import { func, bool } from 'prop-types';

import styles from './SkipButton.module.css';

SkipButton.propTypes = {
  colored: bool,
  onClick: func.isRequired,
};

function SkipButton({ colored = false, onClick, ...restProps }) {
  const classNames =
    `${styles.skipButton} ${colored ? styles.skipButton_colored : ''}`.trim();

  return (
    <button
      className={classNames}
      type="button"
      onClick={onClick}
      {...restProps}
    >
      건너뛰기
    </button>
  );
}

export default memo(SkipButton);
