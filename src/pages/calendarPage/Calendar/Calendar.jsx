import { emotionType } from '@/@types';
import ShellButton from '@/components/ShellButton/ShellButton';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { createCalendarList } from '@/utils';
import { compareAsc, isSameDay, isSameMonth } from 'date-fns';
import { addMonths } from 'date-fns/addMonths';
import { subMonths } from 'date-fns/subMonths';
import { AnimatePresence, motion } from 'framer-motion';
import { arrayOf, func, object, shape, string } from 'prop-types';
import { memo, useCallback, useState } from 'react';
import styles from './Calendar.module.css';

const DAY_LIST = ['일', '월', '화', '수', '목', '금', '토'];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 374 : -374,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -374 : 374,
    opacity: 0,
  }),
};

function assignDiariesToCalendar(calendarList, diaries) {
  let diaryIndex = diaries.length - 1;

  for (let weekIndex = calendarList.length - 1; weekIndex >= 0; weekIndex--) {
    const week = calendarList[weekIndex];

    for (let dayIndex = week.length - 1; dayIndex >= 0; dayIndex--) {
      const day = week[dayIndex];

      if (diaryIndex >= 0 && isSameDay(day.date, diaries[diaryIndex].created)) {
        day.diary = diaries[diaryIndex];
      }

      while (
        diaryIndex >= 0 &&
        compareAsc(day.date, diaries[diaryIndex].created) < 0
      ) {
        diaryIndex--;
      }
    }
  }
}

Calendar.propTypes = {
  diaries: arrayOf(
    shape({ emotion: emotionType, message: string, created: object })
  ),
  selectedDate: object,
  onShellClick: func,
};

function Calendar({ diaries, selectedDate, onShellClick }) {
  const [calendarDate, setCalendarDate] = useState(() => new Date()); // 오늘 날짜
  const [direction, setDirection] = useState(0); // 이전/다음 달로 넘어가는 애니메이션 방향. -1 for left, 1 for right

  // 달력에 key값 및 각 날짜에 해당하는 diary정보 세팅
  const calendarList = createCalendarList(calendarDate).map((week) =>
    week.map((date) => ({
      date,
      key: date.getTime(),
      // props로 받은 diaries 목록 중 각 날짜에 해당하는 diary를 찾아서 할당
      diary: null,
    }))
  );

  // diaries 배열을 역순으로 순회하면서 각 날짜에 해당하는 diary를 할당
  assignDiariesToCalendar(calendarList, diaries);

  // 현재 보고있는 달력의 년,월
  const currentYear = calendarDate.getFullYear();
  const currentMonth = calendarDate.getMonth();

  // 다음 달로 넘기기
  const handleNextMonthButtonClick = () => {
    setDirection(1);
    setCalendarDate((prevCalendarDate) => addMonths(prevCalendarDate, 1));
  };
  // 이전 달로 넘기기
  const handlePrevMonthButtonClick = () => {
    setDirection(-1);
    setCalendarDate((prevCalendarDate) => subMonths(prevCalendarDate, 1));
  };

  // 조개 버튼 클릭
  const handleShellClick = useCallback(
    (date) => () => {
      onShellClick?.(date);
    },
    [onShellClick]
  );

  return (
    <div className={styles.calendar}>
      {/* < 2024.09 > */}
      <div className={styles.calendarHeader}>
        <button
          type="button"
          onClick={handlePrevMonthButtonClick}
          aria-label="이전 달 달력 보기"
          title="이전 달 달력 보기"
        >
          <SVGIcon {...icons.leftDir} />
        </button>
        <h2>
          {currentYear}.{String(currentMonth + 1).padStart(2, '0')}
        </h2>
        <button
          type="button"
          onClick={handleNextMonthButtonClick}
          aria-label="다음 달 달력 보기"
          title="다음 달 달력 보기"
        >
          <SVGIcon {...icons.rightDir} />
        </button>
      </div>

      {/* 일 월 화 수 목 금 토 */}
      <table className={styles.calendarTable}>
        <thead>
          <tr className={styles.dayList}>
            {DAY_LIST.map((item) => (
              <th className={styles.day} key={item}>
                {item}
              </th>
            ))}
          </tr>
        </thead>

        {/* 달력 */}
        {/* 넘어가기 전 달력 보이게 함 */}
        <AnimatePresence custom={direction}>
          <motion.tbody
            className={styles.month}
            key={calendarDate.getTime()} // Key를 변경하여 새롭게 렌더링하게 함
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            {calendarList.map((week, index) => (
              // 일주일
              <tr className={styles.week} key={index}>
                {week.map(({ date, key, diary }) => (
                  // 하루
                  <td className={styles.date} key={key}>
                    {/* 이전, 다음 달의 날짜는 안보이게 함 */}
                    {isSameMonth(calendarDate, date) && (
                      <>
                        {/* 날짜 숫자 표기 */}
                        <span>{date.getDate()}</span>
                        {/* 그 날짜에 해당하는 일기가 있는 칸에만 조개 버튼 렌더링 */}
                        {diary && (
                          <ShellButton
                            emotion={diary.emotion}
                            type="read"
                            block={
                              selectedDate && !isSameDay(selectedDate, date)
                            }
                            onClick={handleShellClick(date)}
                          />
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </motion.tbody>
        </AnimatePresence>
      </table>
    </div>
  );
}

export default memo(Calendar);
