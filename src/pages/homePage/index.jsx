import useBodyScrollLock from '@/hooks/useBodyScrollLock';
import { useSunsetDetector, useSunStore } from '@/stores/sunStore';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import BottleLink from './components/BottleLink/BottleLink';
import Greeting from './components/Greeting/Greeting';
import PlusButton from './components/PlusButton/PlusButton';
import SelectEmotionModal from './components/SelectEmotionModal/SelectEmotionModal';
import styles from './HomePage.module.css';

function HomePage() {
  useSunsetDetector(); // 홈 화면을 열 때마다 sunset 상태 변경
  const sunset = useSunStore((store) => store.sunset);
  const desktop = useMediaQuery({ query: '(min-width: 1024px)' });
  const [modalOpen, setModalOpen] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock(); // 모달창 열었을 때 외부 스크롤 방지
  const [greetingOpen, setGreetingOpen] = useState(true);

  const handleGreetingButtonClick = () =>
    setGreetingOpen((prevValue) => !prevValue);

  const openModal = useCallback(() => {
    setModalOpen(true);
    lockScroll();
  }, [lockScroll]);
  const closeModal = useCallback(() => {
    setModalOpen(false);
    openScroll();
  }, [openScroll]);

  return (
    <div
      className={styles.pageContainer}
      style={{
        backgroundImage: `url(/bgImages/homePage_${sunset ? 'dark' : ''}Bg.webp)`,
      }}
    >
      <h1 className="sr-only">홈 페이지</h1>

      <Greeting
        greetingOpen={greetingOpen}
        onButtonClick={handleGreetingButtonClick}
        style={{ margin: '4.5vh 0 0 4.4vw' }}
      />

      <BottleLink type={'pickUpBottle'} className={styles.bottleLinkLeft} />
      <BottleLink type={'letterBox'} className={styles.bottleLinkRight} />

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
