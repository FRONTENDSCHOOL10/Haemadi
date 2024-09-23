import { Link } from 'react-router-dom';

import styles from './myPage.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import UserProfile from './components/UserProfile/UserProfile';
import InterestBadge from './components/InterestBadge/InterestBadge';
import LinkButton from './components/LinkButton/LinkButton';
import { Helmet } from 'react-helmet-async';

function MyPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const iconSize = !desktop ? { width: 35, height: 35 } : {};

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
          <SVGIcon {...icons.setting} {...iconSize} />
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
