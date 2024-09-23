import { memo } from 'react';

import styles from './SettingsPage.module.css';
import { useMediaStore } from '@/stores/mediaStore';
import BackButton from '@/components/BackButton/BackButton';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';

function SettingsPage() {
  const desktop = useMediaStore((store) => store.desktop);

  return (
    <div className={styles.settingsPage}>
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
