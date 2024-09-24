import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';

import styles from './LetterBoxPage.module.css';
import { useAuthStore } from '@/stores/authStore';
import { BASE_URL } from '@/api/pbconfig';
import useFetch from '@/hooks/useFetch';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import Loading from '@/components/Loading/Loading';

import glassBottle from '/glassBottle/glassBottle_selected.webp';
import glassBottleMobile from '/glassBottle/glassBottle_center.webp';

function LetterBoxPage() {
  const navigate = useNavigate();
  const desktop = useMediaQuery({ query: '(min-width: 960px)' });
  const userInfo = useAuthStore((store) => store.userInfo);

  /* --------------------------------- 스타일 객체 --------------------------------- */
  const backButtonStyle = useMemo(
    () => ({
      position: 'absolute',
      top: desktop ? '8vh' : '24px',
      left: desktop ? 'calc(50vw - 130px)' : '40px',
    }),
    [desktop]
  );
  const buttonStyle = useMemo(
    () => ({
      marginTop: desktop ? '4.6vh' : '5.1vh',
    }),
    [desktop]
  );

  /* ----------------------------- REQUEST URL 작성 ----------------------------- */
  const params = new URLSearchParams({
    // 일기 1개만 가져옴
    page: 1,
    perPage: 1,
    // 답장이 왔고 && 자신이 쓴 일기
    filter: `replyId!="" && userId="${userInfo.id}"`,
    // 가장 최근에 답장을 받은 일기
    sort: '-created',
    expand: 'replyId',
  });

  /* ------------------------------ 서버에 일기 목록 요청 ------------------------------ */
  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records?${params}`;
  const { status, error, data } = useFetch(ENDPOINT);

  if (status === 'loading') return <Loading />;
  if (status === 'error') return <div>{error.message}</div>;

  const diary = data.items[0];
  const { id: diaryId } = diary;
  const { replier } = diary.expand.replyId;

  const handleButtonClick = () => {
    navigate(`view-diary/${diaryId}`);
  };

  /* -------------------------------------------------------------------------- */
  /*                             답장이 없을 때의 로직 처리 필요                             */
  /* -------------------------------------------------------------------------- */

  return (
    <div className={styles.page}>
      <Helmet>
        <title>편지함 - 해마디</title>
        <meta name="description" content="받은 편지를 확인해 보세요" />
        <meta property="og:title" content="편지함 - 해마디" />
        <meta property="og:description" content="받은 편지를 확인해 보세요" />
        <meta name="twitter:title" content="편지함 - 해마디" />
        <meta name="twitter:description" content="받은 편지를 확인해 보세요" />
      </Helmet>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <BackButton color="white" style={backButtonStyle} />
          <h1>마디 유리병 편지함</h1>
        </header>

        <main className={styles.main}>
          <h2>{`${replier === 'ai' ? 'Ai 마디' : '익명의 누군가'}에게 받은\n유리병 편지함이에요`}</h2>
          <img
            src={desktop ? glassBottle : glassBottleMobile}
            alt="유리병"
            className={styles.glassBottle}
            loading="lazy"
          />
          <p>
            {replier === 'ai'
              ? '마디는 해마디의 Ai 서비스로\n작성한 편지를 분석해 답변해요'
              : '누군가 당신의 일기를 보고 답장했어요!'}
          </p>
          <Button role="button" style={buttonStyle} onClick={handleButtonClick}>
            보러 갈래요
          </Button>
        </main>
      </div>
    </div>
  );
}

export default memo(LetterBoxPage);
