import { Link } from 'react-router-dom';

import styles from './MyPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import UserProfile from './components/UserProfile/UserProfile';
import InterestBadge from './components/InterestBadge/InterestBadge';
import LinkButton from './components/LinkButton/LinkButton';

function MyPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const iconSize = !desktop ? { width: 35, height: 35 } : {};

  return (
    <div className={styles.myPage}>
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
