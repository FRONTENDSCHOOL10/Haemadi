import { Helmet } from 'react-helmet-async';

import styles from './StatisticsPage.module.css';
import { BASE_URL } from '@/api/pbconfig';
import { useAuthStore } from '@/stores/authStore';
import useFetch from '@/hooks/useFetch';
import Loading from '@/components/Loading/Loading';
import BackButton from '@/components/BackButton/BackButton';
import EmotionAverage from './components/EmotionPercentage/EmotionPercentage';
import ReplyFromPercentage from './components/ReplyFromPercentage/ReplyFromPercentage';
import AnalysisReport from './components/AnalysisReport/AnalysisReport';
import AIReplyType from './components/AIReplyType/AIReplyType';

function StatisticsPage() {
  const userInfo = useAuthStore((store) => store.userInfo);
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const startDate = `${year}-${month}-01`;

  /* 이번달 작성한 일기, 답장 가져옴 */
  const filterQuery = encodeURIComponent(
    `(userId='${userInfo.id}' && created>='${startDate}')`
  );
  const DIARY_ENDPOINT = `${BASE_URL}/api/collections/diaries/records?sort=created&filter=${filterQuery}`;
  const REPLY_ENDPOINT = `${BASE_URL}/api/collections/replies/records?sort=created&filter=${filterQuery}`;
  const {
    status: diariesStatus,
    error: diariesError,
    data: diariesData,
  } = useFetch(DIARY_ENDPOINT);
  const {
    status: repliesStatus,
    error: repliesError,
    data: repliesData,
  } = useFetch(REPLY_ENDPOINT);

  if (diariesStatus === 'loading' || repliesStatus === 'loading')
    return <Loading />;
  if (diariesStatus === 'error' || repliesStatus === 'error')
    return (
      <>
        <div>{diariesError?.message}</div>
        <div>{repliesError?.message}</div>
      </>
    );

  return (
    <div className={styles.StatisticsPage}>
      <Helmet>
        <title>통계 - 해마디</title>
        <meta name="description" content="감정 통계를 확인하고 분석해 보세요" />
        <meta property="og:title" content="통계 - 해마디" />
        <meta
          property="og:description"
          content="감정 통계를 확인하고 분석해 보세요"
        />
        <meta name="twitter:title" content="통계 - 해마디" />
        <meta
          name="twitter:description"
          content="감정 통계를 확인하고 분석해 보세요"
        />
      </Helmet>
      <header>
        <div className={styles.backButton}>
          <BackButton />
        </div>
        <h1 className={styles.title}>나의 섬 통계</h1>
      </header>
      <div className={styles.cardWrapper}>
        <EmotionAverage diariesData={diariesData} />
        <ReplyFromPercentage diariesData={diariesData} userInfo={userInfo} />
        <AIReplyType diariesData={diariesData} userInfo={userInfo} />
        <AnalysisReport diariesData={diariesData} repliesData={repliesData} />
      </div>
    </div>
  );
}

export default StatisticsPage;
