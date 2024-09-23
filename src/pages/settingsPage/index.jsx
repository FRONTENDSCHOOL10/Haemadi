import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import styles from './SettingsPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';
import BackButton from '@/components/BackButton/BackButton';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';

function SettingsPage() {
  const desktop = useMediaStore((store) => store.desktop);

  return (
    <div className={styles.settingsPage}>
      <Helmet>
        <title>설정 - 해마디</title>
        <meta
          name="description"
          content="해마디에서 사용자 설정을 관리하세요"
        />
        <meta property="og:title" content="설정 - 해마디" />
        <meta
          property="og:description"
          content="해마디에서 사용자 설정을 관리하세요"
        />
        <meta name="twitter:title" content="설정 - 해마디" />
        <meta
          name="twitter:description"
          content="해마디에서 사용자 설정을 관리하세요"
        />
      </Helmet>
      <h1>설정</h1>
      <BackButton
        color="white"
        aria-label="뒤로가기"
        className={`${styles.backButton} ${desktop ? styles.desktopBackButton : styles.mobileBackButton}`}
      />
      <ProfileSettingInfo />
      <OtherSettingList />
    </div>
  );
}

export default memo(SettingsPage);
