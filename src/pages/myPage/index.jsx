import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import styles from './MyPage.module.css';
import InterestBadge from './components/InterestBadge/InterestBadge';
import LinkButton from './components/LinkButton/LinkButton';
import UserProfile from './components/UserProfile/UserProfile';
import { memo } from 'react';

function MyPage() {
  return (
    <div className={styles.myPage}>
      <Helmet>
        <title>마이페이지 - 해마디</title>
        <meta
          name="description"
          content="해마디에서 사용 중인 내 정보를 확인하세요"
        />
        <meta property="og:title" content="마이페이지 - 해마디" />
        <meta
          property="og:description"
          content="해마디에서 사용 중인 내 정보를 확인하세요"
        />
        <meta name="twitter:title" content="마이페이지 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디에서 사용 중인 내 정보를 확인하세요"
        />
      </Helmet>
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

export default memo(MyPage);
