import { useSunsetDetector, useSunStore } from '@/stores/sunStore';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PlusButton from './components/PlusButton/PlusButton';
import SelectEmotionModal from './components/SelectEmotionModal/SelectEmotionModal';
import styles from './HomePage.module.css';

function HomePage() {
  useSunsetDetector(); // 홈 화면을 열 때마다 sunset 상태 변경
  const sunset = useSunStore((store) => store.sunset);
  const desktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // 모달 창 열렸을 때 바깥 쪽 스크롤 방지
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  return (
    <div
      className={styles.pageContainer}
      style={{
        backgroundImage: `url(/homePage/homePage_${sunset ? 'dark' : ''}Bg.png)`,
      }}
    >
      <motion.div
        className={styles.buttonWrapper}
        animate={modalOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{
          delay: modalOpen ? 0 : 1,
          duration: 0,
        }}
        style={modalOpen ? { display: 'none' } : {}}
      >
        <PlusButton
          desktop={desktop}
          onClick={openModal}
          activated={modalOpen}
        />
        <span
          className={`${styles.plusButtonLabel}${!desktop ? ' sr-only' : ''}`}
        >
          일기 쓰기
        </span>
      </motion.div>

      <SelectEmotionModal
        modalOpen={modalOpen}
        desktop={desktop}
        closeModal={closeModal}
      />
    </div>
  );
}

export default HomePage;
