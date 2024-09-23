import { Link } from 'react-router-dom';
import styles from './MyPage.module.css';
import InterestBadge from './components/InterestBadge/InterestBadge';
import LinkButton from './components/LinkButton/LinkButton';
import UserProfile from './components/UserProfile/UserProfile';

function MyPage() {
  return (
    <div className={styles.myPage}>
      <h1 className="sr-only">마이페이지</h1>
      <div className={styles.userProfile}>
        <Link className={styles.setting} to="./settings" aria-label="설정">
          {/* Link에서 텍스트 정보를 제공하므로 alt 일부러 비워둠 */}
          <img src="/setting.svg" alt="" className={styles.settingIcon} />
        </Link>
        <UserProfile />
      </div>
      <div className={styles.menu}>
        <div className={styles.LinkWrapper}>
          <h2 className="sr-only">나의 정보 보기</h2>
          <LinkButton type="bottles">나의 기록</LinkButton>
          <hr />
          <LinkButton type="statistics">나의 섬 통계</LinkButton>
        </div>
        <div className={styles.interestWrapper}>
          <h2>관심사</h2>
          <InterestBadge />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
