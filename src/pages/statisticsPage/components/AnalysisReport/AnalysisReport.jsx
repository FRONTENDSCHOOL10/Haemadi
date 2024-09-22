import { memo } from 'react';
import { object } from 'prop-types';

import styles from './AnalysisReport.module.css';

AnalysisReport.propTypes = {
  diariesData: object,
  repliesData: object,
};

function AnalysisReport({ diariesData = [], repliesData = [] }) {
  // 전체 일기 수
  const totalDiaries = diariesData?.totalItems || 0;

  const totalReplies = repliesData?.totalItems || 0;

  // 긍정적인 감정 (happy, glad 등) 비율 계산
  const positiveEmotions = ['happy', 'glad'];
  const totalPositive =
    diariesData?.items?.filter((item) =>
      positiveEmotions.includes(item.emotion)
    )?.length || 0;
  const positiveIndex =
    totalDiaries > 0 ? Math.round((totalPositive / totalDiaries) * 100) : 0;

  return (
    <div className={styles.card}>
      <h2>종합 분석 보고서</h2>
      <span>이 달의 해마디와 함께한 당신의 기록을 모두 모았어요</span>
      <ul className={styles.dataWrapper}>
        <li style={{ backgroundColor: '#B7DAF0B2' }}>
          <strong>{totalDiaries}</strong>
          <span>일기 작성 횟수</span>
        </li>
        <li style={{ backgroundColor: '#B7DAF066' }}>
          <strong>{totalReplies}</strong>
          <span>답장 작성 횟수</span>
        </li>
        <li style={{ backgroundColor: '#B7DAF0' }}>
          <strong>{positiveIndex}%</strong>
          <span>긍정 지수</span>
        </li>
        <li style={{ backgroundColor: '#B7DAF033' }}>
          <strong>78</strong>
          <span>방문 누적 횟수</span>
        </li>
      </ul>
    </div>
  );
}

export default memo(AnalysisReport);
