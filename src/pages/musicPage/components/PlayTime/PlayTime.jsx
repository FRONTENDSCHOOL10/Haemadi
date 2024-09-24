import { memo } from 'react';
import { number, bool } from 'prop-types';

import styles from './PlayTime.module.css';

function formatTime(seconds) {
  // 분과 초 계산
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

PlayTime.propTypes = {
  time: number,
  colored: bool,
};

function PlayTime({ time = 0, colored = false }) {
  const classNames =
    `${styles.timer} ${colored && styles.timer_colored}`.trim();
  return <span className={classNames}>{formatTime(time)}</span>;
}

export default memo(PlayTime);
