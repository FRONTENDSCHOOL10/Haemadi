import { useEffect, useState, memo } from 'react';
import { number, object, string } from 'prop-types';

import styles from './ReplyFromPercentage.module.css';
import { getReply } from '@/api/replies';

ProgressBar.propTypes = {
  label: string,
  percentage: number,
  color: string,
};

// 가로 막대 그래프
function ProgressBar({ label, percentage, color }) {
  return (
    <div
      className={styles.progress_bar_container}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
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
  diariesData: object,
  userInfo: object,
};

function ReplyFromPercentage({ diariesData, userInfo }) {
  const [repliesData, setRepliesData] = useState([]);

  useEffect(() => {
    // 사용자의 일기 중에 답장이 있는 일기 리스트 반환
    const hasReplyDiaries = diariesData.items.filter((diary) => {
      return diary.userId === userInfo.id && diary.replyId !== '';
    });

    // 답장 데이터 요청 배열 반환
    const fetchReplies = async () => {
      try {
        const repliesPromises = hasReplyDiaries.map((element) =>
          getReply(element.replyId)
        );
        const replies = await Promise.all(repliesPromises);
        setRepliesData(replies);
      } catch (error) {
        console.error('답장 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    if (hasReplyDiaries.length > 0) {
      fetchReplies();
    }
  }, [diariesData, userInfo]);

  // 전체 답장 수
  const totalReplies = repliesData.length;

  // AI 답장 수
  const aiReplies = repliesData?.filter(
    (reply) => reply.replier === 'ai'
  ).length;

  // 퍼센티지 계산 (반올림)
  const aiPercentage = Math.round((aiReplies / totalReplies) * 100);
  const userPercentage = 100 - aiPercentage;

  return (
    <section className={styles.card}>
      <h2>주로 누구에게 답장을 받았을까요?</h2>
      <p>답장을 받은 빈도수를 알 수 있어요</p>
      <div className={styles.dataWrapper}>
        {aiPercentage ? (
          <>
            <ProgressBar label="AI" percentage={aiPercentage} color="#729BD1" />
            <ProgressBar
              label="익명의 누군가"
              percentage={userPercentage}
              color="#205191"
            />
          </>
        ) : (
          <span>데이터가 없습니다. </span>
        )}
      </div>
    </section>
  );
}

export default memo(ReplyFromPercentage);
