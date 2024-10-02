import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import BackButton from '@/components/BackButton/BackButton';
import ModalDialog from '@/components/ModalDialog/ModalDialog';
import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { useAuthStore } from '@/stores/authStore';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtherSettingList from './components/OtherSettingList/OtherSettingList';
import ProfileSettingInfo from './components/ProfileSettingInfo/ProfileSettingInfo';
import styles from './SettingsPage.module.css';

function SettingsPage() {
  const navigate = useNavigate();
  const logoutUser = useAuthStore((store) => store.logoutUser);
  const [modalOpen, setModalOpen] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const openModal = useCallback(() => {
    setModalOpen(true);
    lockScroll();
  }, [lockScroll]);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    openScroll();
  }, [openScroll]);
  const confirmModal = useCallback(() => {
    setModalOpen(false);
    openScroll();
    navigate('/auth');
    logoutUser();
  }, [logoutUser, navigate, openScroll]);

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
        className={styles.backButton}
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
