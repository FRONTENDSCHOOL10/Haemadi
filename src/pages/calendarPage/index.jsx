import { useCallback, useState, memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { isSameDay } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import styles from './CalendarPage.module.css';
import { readDiaries } from '@/api/diaries';
import { useAuthStore } from '@/stores/authStore';
import BackButton from '@/components/BackButton/BackButton';
import Loading from '@/components/Loading/Loading';
import Calendar from './Calendar/Calendar';
import CalendarModal from './CalendarModal/CalendarModal';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';

function CalendarPage() {
  const navigate = useNavigate();
  const userInfo = useAuthStore((store) => store.userInfo);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const diariesParams = useMemo(
    () =>
      new URLSearchParams({
        sort: 'created',
        filter: `userId="${userInfo.id}"`,
      }).toString(),
    [userInfo.id]
  );

  // 현재 로그인한 유저의 일기들을 불러옴
  const { data, error, isLoading } = useQuery({
    queryKey: ['diaries', diariesParams],
    queryFn: () => readDiaries(diariesParams),
  });

  // 불러온 일기들의 created 값을 Date 형식으로 변환
  const diaries = data?.items.map((diary) => ({
    ...diary,
    created: new Date(diary.created),
  }));

  // 불러온 일기 목록 중 달력에서 클릭한 일기를 찾음
  const selectedDiary = diaries?.find((diary) =>
    isSameDay(selectedDate, diary.created)
  );

  // 조개 버튼 클릭 (날짜 선택 + 모달창 열림)
  const handleShellClick = useCallback(
    (date) => {
      setSelectedDate(date);
      setModalOpen(true);
      lockScroll();
    },
    [lockScroll]
  );
  // 모달창 닫기 (날짜 선택 해제 + 모달창 닫힘)
  const closeModal = useCallback(() => {
    setSelectedDate(null);
    setModalOpen(false);
    openScroll();
  }, [openScroll]);
  // 모달창에서 go버튼 누름 (해당 일기의 viewDiaryPage로 이동)
  const confirmModal = useCallback(() => {
    openScroll();
    navigate(`/my/view-diary/${selectedDiary?.id}`);
  }, [navigate, openScroll, selectedDiary]);

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.page}>
      <Helmet>
        <title>캘린더 - 해마디</title>
        <meta
          name="description"
          content="해마디에서 일기를 관리하고 캘린더를 확인하세요"
        />
        <meta property="og:title" content="캘린더 - 해마디" />
        <meta
          property="og:description"
          content="해마디에서 일기를 관리하고 캘린더를 확인하세요"
        />
        <meta name="twitter:title" content="캘린더 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디에서 일기를 관리하고 캘린더를 확인하세요"
        />
      </Helmet>
      <header className={styles.header}>
        <BackButton style={{ position: 'absolute', left: '8vw' }} />
        <h1>나의 기록</h1>
      </header>
      <main className={styles.main}>
        <Calendar
          diaries={diaries}
          selectedDate={selectedDate}
          onShellClick={handleShellClick}
        />

        <CalendarModal
          diaryData={selectedDiary}
          modalOpen={modalOpen}
          closeModal={closeModal}
          confirmModal={confirmModal}
        />
      </main>
    </div>
  );
}

export default memo(CalendarPage);
