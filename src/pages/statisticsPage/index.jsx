import styles from './statisticsPage.module.css';
import BackButton from '@/components/BackButton/BackButton';
import EmotionAverage from './components/EmotionPercentage/EmotionPercentage';
import ReplyFromPercentage from './components/ReplyFromPercentage/ReplyFromPercentage';
import AnalysisReport from './components/AnalysisReport/AnalysisReport';
import AIReplyType from './components/AIReplyType/AIReplyType';

function StatisticsPage() {
  return (
    <div className={styles.StatisticsPage}>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <h1 className={styles.title}>나의 섬 통계 </h1>
      <div className={styles.cardWrapper}>
        <EmotionAverage />
        <ReplyFromPercentage />
        <AIReplyType />
        <AnalysisReport />
      </div>
    </div>
  );
}

export default StatisticsPage;
