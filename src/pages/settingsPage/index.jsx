import BackButton from '@/components/BackButton/BackButton';
import { useMediaStore } from '@/stores/mediaStore';
import { memo } from 'react';
import { useMediaQuery } from 'react-responsive';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';
import styles from './settingsPage.module.css';

function SettingsPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const SmallScreen = useMediaQuery({ query: '(max-width: 400px)' });

  const topPosition = SmallScreen ? '29px' : '68px'; // 400px 이하일 때 top 조절

  return (
    <div className={styles.settingsPage}>
      <h1>설정</h1>
      <BackButton
        color="white"
        aria-label="뒤로가기"
        style={{
          position: 'absolute',
          top: topPosition,
          left: desktop ? '43vw' : '7vw',
        }}
      />
      <ProfileSettingInfo />
      <OtherSettingList />
    </div>
  );
}

export default memo(SettingsPage);
