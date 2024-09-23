import { memo } from 'react';
import { number, object, string } from 'prop-types';

import styles from './ReplyFromPercentage.module.css';

ProgressBar.propTypes = {
  label: string,
  percentage: number,
  color: string,
};

// 가로 막대 그래프
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
  repliesData: object,
};

function ReplyFromPercentage({ repliesData }) {
  // repliesData가 유효한지 확인
  if (!repliesData || !repliesData.items) {
    return <div>답장 데이터가 없습니다.</div>; // 데이터가 없을 때 표시할 메시지
  }

  // 전체 답장 수
  const totalReplies = repliesData.totalItems;

  // AI 답장 수
  const aiReplies = repliesData.items.filter(
    (reply) => reply.replier === 'ai'
  ).length;

  // 퍼센티지 계산 (반올림)
  const aiPercentage = Math.round((aiReplies / totalReplies) * 100);
  const userPercentage = 100 - aiPercentage;

  return (
    <div className={styles.card}>
      <h2>주로 누구에게 답장을 받았을까요?</h2>
      <p>답장을 받은 빈도수를 알 수 있어요</p>
      <div className={styles.dataWrapper}>
        <ProgressBar label="AI" percentage={aiPercentage} color="#729BD1" />
        <ProgressBar
          label="익명의 누군가"
          percentage={userPercentage}
          color="#205191"
        />
      </div>
    </div>
  );
}

export default memo(ReplyFromPercentage);
