import ShellButton from '@/components/ShellButton/ShellButton';
import { EMOTION_LABEL, EMOTIONS } from '@/constants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import PlusButton from './components/PlusButton/PlusButton';
import style from './Home.module.css';

const MotionPlusButton = motion(PlusButton);

function Home() {
  const [spreadShells, setSpreadShells] = useState(false);

  const handleClickPlus = () => {
    setSpreadShells(!spreadShells);
  };

  return (
    <div>
      <MotionPlusButton
        onClick={handleClickPlus}
        animate={{ rotate: spreadShells ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <ul
        className={style.shellList}
        style={spreadShells ? {} : { display: 'none' }}
      >
        {EMOTIONS.map((emotion, index) => (
          <li key={index}>
            <ShellButton emotion={emotion} />
            <span>{EMOTION_LABEL[emotion]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
