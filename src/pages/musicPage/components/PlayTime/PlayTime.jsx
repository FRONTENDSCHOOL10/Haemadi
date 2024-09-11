import { memo } from 'react';
import { number, bool } from 'prop-types';

import styles from './PlayTime.module.css';

function formatTime(seconds) {
  // 분과 초 계산
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // 분과 초가 한 자릿수일 경우 0을 붙여줌
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

PlayTime.propTypes = {
  time: number,
  colored: bool,
};

function PlayTime({ time = 0, colored = false }) {
  const classNames =
    `${styles.timer} ${colored ? styles.timer_colored : ''}`.trim();
  return <span className={classNames}>{formatTime(time)}</span>;
}

export default memo(PlayTime);
