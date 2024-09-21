import { memo } from 'react';
import { arrayOf, oneOf } from 'prop-types';

import styles from './ReplyFromPercentage.module.css';

function ProgressBar({ label, percentage, color }) {
  return (
    <div className={styles.progress_bar_container}>
      <div className={styles.progress_bar}>
        <span className={styles.label}>{label}</span>
        <div
          className={styles.progress_bar_fill}
          style={{
            width: `calc(${percentage}% - 25%)`,
            backgroundColor: color,
          }}
        >
          <span className={styles.percentage_label}>{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

ReplyFromPercentage.propTypes = {
  keywordList: arrayOf(oneOf()),
};

function ReplyFromPercentage() {
  return (
    <div className={styles.card}>
      <h2>주로 누구에게 답장을 받았을까요?</h2>
      <span>답장을 받은 빈도수를 알 수 있어요</span>
      <div className={styles.dataWrapper}>
        <ProgressBar label="AI" percentage={30} color="#729BD1" />
        <ProgressBar label="익명의 누군가" percentage={70} color="#205191" />
      </div>
    </div>
  );
}

export default memo(ReplyFromPercentage);
