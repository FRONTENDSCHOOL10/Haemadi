import { memo, useState, useEffect } from 'react';
import { arrayOf, oneOf } from 'prop-types';

import styles from './AIReplyType.module.css';

const calcData = [
  { name: '음악', size: 40, color: '#749DD3' },
  { name: '영상', size: 10, color: '#B7DAF0' },
  { name: '명언', size: 30, color: '#DAF1FF' },
  { name: '책', size: 20, color: '#8CBEFF' },
];

AIReplyType.propTypes = {
  keywordList: arrayOf(oneOf()),
};

function AIReplyType() {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    const generateCircles = () => {
      const numCircles = calcData.length; // 키워드 개수에 따라 원의 개수 결정
      const circleData = [];
      const containerWidth = 290; // 캔버스 너비
      const containerHeight = 240; // 캔버스 높이
      const minRadius = 20; // 최소 반지름
      const maxAdditionalRadius = 100; // 최대 추가 반지름

      for (let i = 0; i < numCircles; i++) {
        // 퍼센트에 따라 크기를 조정
        const additionalRadius = (calcData[i].size / 100) * maxAdditionalRadius;
        const radius = minRadius + additionalRadius; // 최소 반지름에 추가 반지름 더함

        let newCircle = null;
        let isValid = false;

        // 겹치지 않도록 새로운 좌표 찾기
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
                {calcData[i].size}%
              </>
            ),
            color: calcData[i].color,
          }; // 라벨 추가
          isValid = true;

          // 다른 원들과 겹치지 않는지 확인
          for (let circle of circleData) {
            let dx = circle.x - newCircle.x;
            let dy = circle.y - newCircle.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < circle.radius + newCircle.radius + 5) {
              // 5px 여유 공간
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
  }, []);
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
