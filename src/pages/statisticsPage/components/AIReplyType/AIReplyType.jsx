import { memo, useState, useEffect, useMemo } from 'react';
import { object } from 'prop-types';

import styles from './AIReplyType.module.css';
import { getReply } from '@/api/replies';

AIReplyType.propTypes = {
  diariesData: object,
  userInfo: object,
};

function AIReplyType({ diariesData, userInfo }) {
  const [circles, setCircles] = useState([]);
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

  const calcData = useMemo(() => {
    if (!repliesData) return []; // 데이터가 없을 경우 빈 배열 반환

    // AI가 작성한 답장만 필터링
    const aiReplies = repliesData.filter((reply) => reply.replier === 'ai');
    const totalAIReplies = aiReplies.length;

    if (totalAIReplies === 0) return []; // AI 답장이 없을 경우 빈 배열 반환

    const typeCounts = aiReplies.reduce(
      (counts, reply) => {
        const type = reply.typeOfContent;
        if (counts[type] !== undefined) {
          counts[type]++;
        }
        return counts;
      },
      { music: 0, video: 0, quote: 0, book: 0 }
    );

    // 각 답장의 종류에 따른 퍼센트 계산
    return [
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
    ].filter((data) => data.size > 0); // 0% 데이터는 제거
  }, [repliesData]);

  useEffect(() => {
    const generateCircles = () => {
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
          const x = Math.random() * (containerWidth - 2 * radius) + radius;
          const y = Math.random() * (containerHeight - 2 * radius) + radius;
          newCircle = {
            x,
            y,
            radius,
            label: (
              <>
                {calcData[i].name}
                <br />
                {calcData[i].size.toFixed(2)}%
              </>
            ),
            color: calcData[i].color,
          };
          isValid = true;

          // 다른 원들과 겹치지 않도록 확인
          for (const circle of circleData) {
            const dx = circle.x - newCircle.x;
            const dy = circle.y - newCircle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
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
  }, [calcData]);

  return (
    <section className={styles.card}>
      <h2>AI에게 어떤 종류의 답장을 많이 받았을까요?</h2>
      <p>어떤 추천을 받았는지 알아보아요</p>
      <div
        className={styles.dataWrapper}
        style={
          circles.length === 0
            ? {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            : {}
        }
      >
        {circles.length !== 0 ? (
          circles.map((circle, index) => (
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
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span className={styles.circle_label}>{circle.label}</span>
            </div>
          ))
        ) : (
          <span>데이터가 없습니다.</span>
        )}
      </div>
    </section>
  );
}

export default memo(AIReplyType);
