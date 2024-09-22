import { memo, useState, useEffect } from 'react';
import { object } from 'prop-types';

import styles from './AIReplyType.module.css';

AIReplyType.propTypes = {
  repliesData: object,
};

function AIReplyType({ repliesData }) {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const calculatePercentages = () => {
      if (!repliesData || !repliesData.items) return []; // 데이터가 없을 경우 빈 배열 반환

      // AI가 작성한 답장만 필터링
      const aiReplies = repliesData.items.filter(
        (reply) => reply.replier === 'ai'
      );
      const totalAIReplies = aiReplies.length;

      const typeCounts = {
        music: 0,
        video: 0,
        quote: 0,
        book: 0,
      };
      // 답장 데이터에서 typeOfContent에 따라 카운트
      repliesData.items.forEach((reply) => {
        const type = reply.typeOfContent;
        if (typeCounts[type] !== undefined) {
          typeCounts[type]++;
        }
      });

      // 각 답장의 종류에 따른 퍼센트 계산
      const calcData = [
        {
          name: '음악',
          size: (typeCounts.music / totalAIReplies) * 100,
          color: '#749DD3',
        },
        {
          name: '영상',
          size: (typeCounts.video / totalAIReplies) * 100,
          color: '#B7DAF0',
        },
        {
          name: '명언',
          size: (typeCounts.quote / totalAIReplies) * 100,
          color: '#A2D9FB',
        },
        {
          name: '책',
          size: (typeCounts.book / totalAIReplies) * 100,
          color: '#8CBEFF',
        },
      ];

      return calcData.filter((data) => data.size > 0); // 0% 데이터는 제거
    };

    const generateCircles = () => {
      const calcData = calculatePercentages();
      const numCircles = calcData.length;
      const circleData = [];
      const containerWidth = 290; // 박스 너비
      const containerHeight = 240; // 박스 높이
      const minRadius = 20; // 최소 반지름
      const maxAdditionalRadius = 100; // 최대 추가 반지름

      for (let i = 0; i < numCircles; i++) {
        const additionalRadius = (calcData[i].size / 100) * maxAdditionalRadius;
        const radius = minRadius + additionalRadius;

        let newCircle = null;
        let isValid = false;

        while (!isValid) {
          let x = Math.random() * (containerWidth - 2 * radius) + radius;
          let y = Math.random() * (containerHeight - 2 * radius) + radius;
          newCircle = {
            x,
            y,
            radius,
            label: (
              <>
                {calcData[i].name}
                <br />
                {calcData[i].size.toFixed(2)}% {/* 소수점 2자리까지 표시 */}
              </>
            ),
            color: calcData[i].color,
          };
          isValid = true;

          for (let circle of circleData) {
            let dx = circle.x - newCircle.x;
            let dy = circle.y - newCircle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circle.radius + newCircle.radius + 5) {
              isValid = false;
              break;
            }
          }
        }
        circleData.push(newCircle);
      }
      setCircles(circleData);
    };

    generateCircles();
  }, [repliesData]);

  if (!repliesData || !repliesData.items) {
    return (
      <div className={styles.card}>
        <h2>AI 답장 데이터가 없습니다.</h2>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <h2>AI에게 어떤 종류의 답장을 많이 받았을까요?</h2>
      <span>어떤 추천을 받았는지 알아보아요</span>
      <div className={styles.dataWrapper}>
        {circles.map((circle, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: circle.radius * 2 + 'px',
              height: circle.radius * 2 + 'px',
              borderRadius: '50%',
              backgroundColor: circle.color,
              left: circle.x - circle.radius + 'px',
              top: circle.y - circle.radius + 'px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span className={styles.circle_label}>{circle.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(AIReplyType);
