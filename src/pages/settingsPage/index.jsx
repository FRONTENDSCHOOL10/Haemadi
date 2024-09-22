import Loading from '@/components/Loading/Loading';
import { useMediaQuery } from 'react-responsive';
import styles from './settingsPage.module.css';
import BackButton from '@/components/BackButton/BackButton';
import { useMediaStore } from '@/stores/mediaStore';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import { useState, useEffect } from 'react'; 

function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const desktop = useMediaStore((store) => store.desktop);
  const SmallScreen = useMediaQuery({ query: '(max-width: 400px)' });

  const topPosition = SmallScreen ? '29px' : '68px'; // 400px 이하일 때 top 조절
  useEffect(() => {
    const simulateLoading = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(simulateLoading); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  if (loading) {
    return <Loading />;
  }

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

export default SettingsPage;
