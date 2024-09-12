import { Link } from 'react-router-dom';

import styles from './myPage.module.css';
import SVGIcon from '@/components/SVGIcon/SVGIcon';
import icons from '@/icons';
import { useMediaStore } from '@/stores/mediaStore';
import InterestBadge from './components/InterestBadge/InterestBadge';
import LinkButton from './components/LinkButton/LinkButton';

import defaultProfile from '/background/default_Profile.png';

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
        {/* 추후 로그인된 사용자 정보 가져오기 */}
        <img src={defaultProfile} alt="기본 프로필" />
        <span>고된 하루를 보낸 토끼</span>
      </div>
      <div className={styles.menu}>
        <div className={styles.LinkWrapper}>
          <h2 className="sr-only">나의 정보 보기</h2>
          <LinkButton type="bottles">나의 기록</LinkButton>
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
