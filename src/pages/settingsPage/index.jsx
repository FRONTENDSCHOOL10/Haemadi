import { memo } from 'react';

import styles from './SettingsPage.module.css';
import BackButton from '@/components/BackButton/BackButton';
import ModalDialog from '@/components/ModalDialog/ModalDialog';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';
import { useAuthStore } from '@/stores/authStore';
import { useMediaStore } from '@/stores/mediaStore';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SettingsPage() {
  const desktop = useMediaStore((store) => store.desktop);
  const navigate = useNavigate();
  const logoutUser = useAuthStore((store) => store.logoutUser);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const confirmModal = useCallback(() => {
    setModalOpen(false);
    navigate('/auth');
    logoutUser();
  }, [logoutUser, navigate]);

  return (
    <div className={styles.settingsPage}>
      <h1>설정</h1>
      <BackButton
        color="white"
        aria-label="뒤로가기"
        className={`${styles.backButton} ${desktop ? styles.desktopBackButton : styles.mobileBackButton}`}
      />
      <ProfileSettingInfo />
      <OtherSettingList openModal={openModal} />

      <ModalDialog
        isOpen={modalOpen}
        closeModal={closeModal}
        confirmModal={confirmModal}
      >
        <h2>정말 로그아웃 하시나요?</h2>
        <p>{'"예"를 선택하시면\n로그인 화면으로 이동합니다'}</p>
      </ModalDialog>
    </div>
  );
}

export default memo(SettingsPage);
