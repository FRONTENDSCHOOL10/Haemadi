import { BASE_URL } from '@/api/pbconfig';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import useFetch from '@/hooks/useFetch';
import { useAuthStore } from '@/stores/authStore';
import { getRandomNumbers } from '@/utils';
import { memo, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './PickUpBottlePage.module.css';
import BottleRadioGroup from './components/BottleRadioGroup/BottleRadioGroup';

function PickUpBottlePage() {
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
      marginTop: desktop ? '6.8vh' : '5.1vh',
    }),
    [desktop]
  );

  /* ----------------------------- REQUEST URL 작성 ----------------------------- */
  const filterQuery = useMemo(
    () =>
      userInfo.interest
        .map((interest) => `userId.interest~"${interest}"`)
        .join(' || '),
    [userInfo.interest]
  );
  const params = new URLSearchParams({
    // 답장이 없고 && 자신이 쓴 일기가 아니고 && 관심사가 하나 이상 겹치는 사람의 일기
    filter: `replyId="" && userId != "${userInfo.id}" && (${filterQuery})`,
    expand: 'userId',
  });

  /* ------------------------------ 서버에 일기 목록 요청 ------------------------------ */
  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records?${params}`;
  const { status, error, data } = useFetch(ENDPOINT);

  if (status === 'loading') return <div>로딩중...</div>;
  if (status === 'error') return <div>{error.message}</div>;
  if (status !== 'success') return null;

  /* --------------------------- 서버 요청 응답 성공 시에만 실행 --------------------------- */

  console.log(data.items);
  console.log(getRandomNumbers(data.items.length, 5));

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <BackButton color="white" style={backButtonStyle} />
          <h1>마디 유리병 편지함</h1>
        </header>

        <form className={styles.form}>
          <h2>{'5개의 유리병 중 하나를 골라\n편지에 답장을 할 수 있어요'}</h2>
          <BottleRadioGroup desktop={desktop} />
          <p>
            {'편지는 익명의 사용자에게 받게 되며\n한번의 답장을 할 수 있어요'}
          </p>
          <Button role="submit" style={buttonStyle}>
            이걸로 선택할게요
          </Button>
        </form>
      </div>
    </div>
  );
}

export default memo(PickUpBottlePage);
