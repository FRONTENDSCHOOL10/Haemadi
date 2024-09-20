import { BASE_URL } from '@/api/pbconfig';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import useFetch from '@/hooks/useFetch';
import { useAuthStore } from '@/stores/authStore';
import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './PickUpBottlePage.module.css';
import BottleRadioGroup from './components/BottleRadioGroup/BottleRadioGroup';
import { getRandomNumbers } from '@/utils';

function PickUpBottlePage() {
  const desktop = useMediaQuery({ query: '(min-width: 960px)' });
  const userInfo = useAuthStore((store) => store.userInfo);

  const filterQuery = userInfo.interest
    .map((interest) => `userId.interest~"${interest}"`)
    .join(' || ');

  const params = new URLSearchParams({
    filter: `replyId="" && userId != "${userInfo.id}" && (${filterQuery})`,
    expand: 'userId',
  });

  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records?${params}`;
  const { status, error, data } = useFetch(ENDPOINT);

  if (status === 'loading') return <div>로딩중...</div>;
  if (status === 'error') return <div>{error.message}</div>;
  if (status !== 'success') return null;

  console.log(data.items);
  console.log(getRandomNumbers(data.items.length, 5));

  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <header className={styles.header}>
          <BackButton
            color="white"
            style={{
              position: 'absolute',
              top: desktop ? '8vh' : '24px',
              left: desktop ? 'calc(50vw - 130px)' : '40px',
            }}
          />
          <h1>마디 유리병 편지함</h1>
        </header>

        <form className={styles.form}>
          <h2>{'5개의 유리병 중 하나를 골라\n편지에 답장을 할 수 있어요'}</h2>
          <BottleRadioGroup desktop={desktop} />
          <p>
            {'편지는 익명의 사용자에게 받게 되며\n한번의 답장을 할 수 있어요'}
          </p>
          <Button
            role="submit"
            style={{ marginTop: desktop ? '6.8vh' : '5.1vh' }}
          >
            이걸로 선택할게요
          </Button>
        </form>
      </div>
    </div>
  );
}

export default memo(PickUpBottlePage);
