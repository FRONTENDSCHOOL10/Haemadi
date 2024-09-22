import { BASE_URL } from '@/api/pbconfig';
import BackButton from '@/components/BackButton/BackButton';
import Button from '@/components/Button/Button';
import Loading from '@/components/Loading/Loading';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import useFetch from '@/hooks/useFetch';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import { formatDate } from '@/utils/formatDate';
import { memo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './ViewLetterPage.module.css';

function ViewLetterPage() {
  const { diaryId } = useParams();
  const desktop = useMediaStore((store) => store.desktop);
  const navigate = useNavigate();

  const ENDPOINT = `${BASE_URL}/api/collections/diaries/records/${diaryId}?expand=replyId,userId`;
  const { status, error, data } = useFetch(ENDPOINT);

  // 상황별, 조건부 처리
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <div>{error.message}</div>;

  /* --------------------------- data가 존재할 경우, 코드 실행 -------------------------- */

  // data 반응성 상태에 파생된 상태
  const { id, created, message } = data;

  // data 반응성 상태에 파생된 상태 (날짜 포맷팅)
  const createdDate = new Date(created);
  const formattedDate1 = formatDate(createdDate, 1); // 2024-09-18 형식
  const formattedDate2 = formatDate(createdDate, 2); // 24.09.18 (Wed) 형식

  const handleButtonClick = () => navigate(`/pick-up-bottle/write-reply/${id}`);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BackButton
          style={{
            position: 'absolute',
            top: desktop ? '11vh' : '33px',
            left: desktop ? '15.625vw' : '36px',
          }}
        />
        <h1 className="sr-only">익명의 누군가가 작성한 일기에요</h1>
        <SVGIcon {...icons[`bottle_horizental${desktop ? '_pc' : ''}`]} />
        <time dateTime={formattedDate1}>{formattedDate2}</time>
      </header>

      <main className={styles.main}>
        <section className={styles.diary}>
          <h2>오늘 하루는 이랬어요</h2>
          <p>{message}</p>
        </section>
      </main>
      <Button state="primary" onClick={handleButtonClick}>
        이 편지에 답장할래요
      </Button>
      <Link
        to="/"
        style={{
          color: '#787878',
          fontSize: 'var(--text-xs, 14px)',
          textDecorationLine: 'underline',
          marginTop: '13px',
          marginBottom: '28px',
        }}
      >
        답장 건너뛰기
      </Link>
    </div>
  );
}

export default memo(ViewLetterPage);
