import { Helmet } from 'react-helmet-async';

import { BASE_URL } from '@/api/pbconfig';
import BackButton from '@/components/BackButton/BackButton';
import Loading from '@/components/Loading/Loading';
import useFetch from '@/hooks/useFetch';
import { isSameDay } from 'date-fns';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
import CalendarModal from './CalendarModal/CalendarModal';
import styles from './CalendarPage.module.css';

function CalendarPage() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // 로그인 기능 구현 후 userId 변경 필요
  // 현재 로그인한 유저의 일기들을 불러옴
  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records?sort=created&filter=(userId='nxorcbf2dujhxfu')`;
  const { status, error, data } = useFetch(ENDPOINT);

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
  const handleShellClick = useCallback((date) => {
    setSelectedDate(date);
    setModalOpen(true);
  }, []);
  // 모달창 닫기 (날짜 선택 해제 + 모달창 닫힘)
  const closeModal = useCallback(() => {
    setSelectedDate(null);
    setModalOpen(false);
  }, []);
  // 모달창에서 go버튼 누름 (해당 일기의 viewDiaryPage로 이동)
  const confirmModal = useCallback(() => {
    navigate(`/my/view-diary/${selectedDiary?.id}`);
  }, [navigate, selectedDiary]);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <div>{error.message}</div>;

  return (
    <>
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
        <BackButton style={{ position: 'absolute', left: 0 }} />
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
    </>
  );
}

export default CalendarPage;
