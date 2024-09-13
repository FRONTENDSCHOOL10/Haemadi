import ShellButton from '@/components/ShellButton/ShellButton';
import { EMOTION_LABEL, EMOTIONS } from '@/constants';
import { useMediaStore } from '@/stores/mediaStore';
import { useSunsetDetector } from '@/stores/sunStore';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import PlusButton from './components/PlusButton/PlusButton';
import styles from './HomePage.module.css';

// PlusButton에 애니메이션을 주기 위함
const MotionPlusButton = motion(PlusButton);

function HomePage() {
  useSunsetDetector(); // 홈 화면을 열 때마다 sunset 상태 변경
  const desktop = useMediaStore((store) => store.desktop);

  const [spreadShells, setSpreadShells] = useState(false);

  const handleClickPlus = useCallback(() => {
    setSpreadShells((prevSpreadShells) => !prevSpreadShells);
  }, []);

  // 스타일 수정 필요
  return (
    <div className={styles.pageContainer}>
      {/* activated를 전달하면 framer-motion을 사용하지 않고 css로 애니메이션이 가능하지만 다른 애니메이션도 추가할 것을 고려하여 남겨둠 */}
      <MotionPlusButton
        onClick={handleClickPlus}
        activated={spreadShells}
        animate={
          spreadShells ? { rotate: 45, translateY: '-90px' } : { rotate: 0 }
        }
        transition={{ duration: 0.3 }}
      />

      <motion.ul
        className={styles.shellList}
        animate={
          spreadShells
            ? { opacity: 1, display: 'flex' }
            : { opacity: 0, display: 'none' }
        }
        transition={{ duration: 0.3 }}
      >
        {EMOTIONS.map((emotion, index) => (
          <li key={index}>
            <ShellButton emotion={emotion} />
            {desktop && <span>{EMOTION_LABEL[emotion]}</span>}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export default HomePage;
