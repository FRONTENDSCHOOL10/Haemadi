import ShellButton from '@/components/ShellButton/ShellButton';
import { DESKTOP, EMOTION_LABEL, EMOTIONS } from '@/constants';
import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import PlusButton from './components/PlusButton/PlusButton';
import style from './Home.module.css';

// PlusButton에 애니메이션을 주기 위함
const MotionPlusButton = motion(PlusButton);

function Home() {
  const desktop = useMediaQuery(DESKTOP);
  const [spreadShells, setSpreadShells] = useState(false);

  const handleClickPlus = useCallback(() => {
    setSpreadShells((prevSpreadShells) => !prevSpreadShells);
  }, []);

  // 스타일 수정 필요
  return (
    <div className={style.pageContainer}>
      <MotionPlusButton
        onClick={handleClickPlus}
        animate={
          spreadShells ? { rotate: 45, translateY: '-90px' } : { rotate: 0 }
        }
        transition={{ duration: 0.3 }}
      />

      <motion.ul
        className={style.shellList}
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

export default Home;
