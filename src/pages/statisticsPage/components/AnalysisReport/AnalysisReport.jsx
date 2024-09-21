import { memo } from 'react';
import { arrayOf, oneOf } from 'prop-types';

import styles from './AnalysisReport.module.css';

AnalysisReport.propTypes = {
  keywordList: arrayOf(oneOf()),
};

function AnalysisReport() {
  return (
    <div className={styles.card}>
      <h2>종합 분석 보고서</h2>
      <span>이 달의 해마디와 함께한 당신의 기록을 모두 모았어요</span>
      <ul className={styles.dataWrapper}>
        <li style={{ backgroundColor: '#B7DAF0B2' }}>
          <strong>23</strong>
          <span>편지 작성 횟수</span>
        </li>
        <li style={{ backgroundColor: '#B7DAF066' }}>
          <strong>18</strong>
          <span>답장 작성 횟수</span>
        </li>
        <li style={{ backgroundColor: '#B7DAF0' }}>
          <strong>50%</strong>
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
