import BackButton from '@/components/BackButton/BackButton';
import { useMediaStore } from '@/stores/mediaStore';
import { memo } from 'react';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';
import styles from './SettingsPage.module.css';

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