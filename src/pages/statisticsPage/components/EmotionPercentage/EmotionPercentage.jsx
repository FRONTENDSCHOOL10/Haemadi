import { memo } from 'react';
import { arrayOf, oneOf } from 'prop-types';

import styles from './EmotionPercentage.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';

EmotionPercentage.propTypes = {
  keywordList: arrayOf(oneOf()),
};

function EmotionPercentage() {
  const radius = 105; // 도넛 반지름
  const strokeWidth = 55; // 도넛 두께
  const circumference = 2 * Math.PI * radius; // 원 둘레
  const halfCircumference = circumference / 2;

  // 각 부분의 비율 (퍼센트 값)
  const segments = [
    { value: 6, color: '#b4d8c4' }, // 녹색
    { value: 21, color: '#c6dce7' }, // 파란색
    { value: 45, color: '#f7dfa6' }, // 노란색
    { value: 20, color: '#fcc9d4' }, // 분홍색
    { value: 8, color: '#cdc1e2' }, // 보라색
  ];

  // 도넛의 둘레 부분을 그리기 위한 stroke 계산
  let accumulatedOffset = 0;
  return (
    <div className={styles.card}>
      <h2>한 달간 나의 감정 분포를 알아볼까요?</h2>
      <span>감정을 한 눈에 확인할 수 있어요</span>
      <div className={styles.dataWrapper}>
        <div className={styles.emotionAverage}>
          평균기분
          <SVGIcon {...icons.shell_glad} />
        </div>

        <div className={styles.piechart}>
          <svg width="300" height="150" viewBox="0 0 300 150">
            {segments.map((segment, index) => {
              const strokeValue = (halfCircumference * segment.value) / 100;
              const strokeDasharray = `${strokeValue} ${halfCircumference - strokeValue}`;
              const strokeDashoffset = accumulatedOffset;
              accumulatedOffset -= strokeValue; // 다음 섹션을 위한 offset 업데이트
              return (
                <circle
                  key={index}
                  cx="150"
                  cy="150"
                  r={radius}
                  fill="transparent"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                />
              );
            })}
          </svg>
        </div>
        {/* 상위 5개 감정 가져오기 */}
        <ul className={styles.emotionShellList}>
          <li title="감정">
            <SVGIcon {...icons.shell_panic} width={45} />
            <span>6%</span>
          </li>
          <li title="감정">
            <SVGIcon {...icons.shell_anxiety} width={45} />
            <span>21%</span>
          </li>
          <li title="감정">
            <SVGIcon {...icons.shell_glad} width={45} />
            <span>45%</span>
          </li>
          <li title="감정">
            <SVGIcon {...icons.shell_happy} width={45} />
            <span>20%</span>
          </li>
          <li title="감정">
            <SVGIcon {...icons.shell_tired} width={45} />
            <span>8%</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default memo(EmotionPercentage);
