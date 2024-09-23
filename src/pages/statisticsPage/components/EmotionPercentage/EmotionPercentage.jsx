import { memo } from 'react';
import { object } from 'prop-types';

import styles from './EmotionPercentage.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { EMOTION_LABEL } from '@/constants';

const EMOTIONS = [
  { emotion: 'angry', color: '#FF9D9D' },
  { emotion: 'happy', color: '#FFC2DE ' },
  { emotion: 'glad', color: '#FFD160' },
  { emotion: 'panic', color: '#A6E076 ' },
  { emotion: 'anxiety', color: '#A9EBF7' },
  { emotion: 'sad', color: '#89CAF0' },
  { emotion: 'normal', color: '#E2CFFF' },
  { emotion: 'tired', color: '#BAADFE' },
];

EmotionPercentage.propTypes = {
  diariesData: object,
};

function EmotionPercentage({ diariesData }) {
  const radius = 105; // 도넛 반지름
  const strokeWidth = 55; // 도넛 두께
  const circumference = 2 * Math.PI * radius; // 원 둘레
  const halfCircumference = circumference / 2;

  // 데이터가 없을 경우 기본값 설정
  const diaryItems = diariesData?.items || [];

  // 감정별 카운트
  const emotionCounts = diaryItems.reduce((acc, item) => {
    acc[item.emotion] = (acc[item.emotion] || 0) + 1;
    return acc;
  }, {});

  // 전체 아이템 수
  const totalItems = diariesData?.totalItems || 0;

  // 감정별 퍼센테이지 계산 후 상위 5개만 선택
  const sortedEmotionPercentages = Object.entries(emotionCounts)
    .map(([emotion, count]) => ({
      emotion,
      percentage: (count / totalItems) * 100, // 소수점 유지된 퍼센테이지
      roundedPercentage: Math.round((count / totalItems) * 100), // 라벨에 표시할 반올림된 값
    }))
    .sort((a, b) => b.percentage - a.percentage) // 내림차순 정렬
    .slice(0, 5); // 상위 5개의 감정 선택

  // 상위 5개 감정에 맞는 색상 매칭
  const segments = sortedEmotionPercentages.map(({ emotion, percentage }) => {
    const emotionData = EMOTIONS.find((e) => e.emotion === emotion);
    return {
      value: percentage, // 그래프에 소수점 포함된 퍼센티지 사용
      color: emotionData?.color || '#ccc', // 색상 찾지 못하면 기본 회색
    };
  });

  // 도넛의 둘레 부분을 그리기 위한 stroke 계산
  let accumulatedOffset = 0;
  return (
    <section className={styles.card}>
      <h2>한 달간 나의 감정 분포를 알아볼까요?</h2>
      <p>감정을 한 눈에 확인할 수 있어요</p>
      <div className={styles.dataWrapper}>
        {totalItems !== 0 && (
          <figure
            className={styles.emotionAverage}
            title={EMOTION_LABEL[sortedEmotionPercentages[0]?.emotion]}
            aria-label={EMOTION_LABEL[sortedEmotionPercentages[0]?.emotion]}
          >
            <figcaption>평균기분</figcaption>
            <SVGIcon
              {...icons[`shell_${sortedEmotionPercentages[0]?.emotion}`]}
            />
          </figure>
        )}
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
          {sortedEmotionPercentages.map((segment, index) => (
            <li
              key={index}
              title={EMOTION_LABEL[segment.emotion]}
              aria-label={EMOTION_LABEL[segment.emotion]}
            >
              <SVGIcon {...icons[`shell_${segment.emotion}`]} width={45} />
              {/* 반올림된 값으로 라벨에 표시 */}
              <span>{segment.roundedPercentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(EmotionPercentage);
