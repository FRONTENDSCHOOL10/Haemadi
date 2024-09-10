import { useState, useCallback } from 'react';

import styles from './EmotionRadioList.module.css';
import RadioInput from '@/components/RadioInput/RadioInput';

const emotion = [
  '행복해요',
  '평범해요',
  '슬퍼요',
  '피곤해요',
  '꿀꿀해요',
  '힘들어요',
  '모르겠어요',
];

function EmotionRadioList() {
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const handleEmotionChange = useCallback((value) => {
    setSelectedEmotion(value);
  }, []);

  return (
    <ul className={styles.emotionWrapper}>
      {emotion.map((element) => (
        <li key={element}>
          <RadioInput groupName="emotion" onChange={handleEmotionChange}>
            {element}
          </RadioInput>
        </li>
      ))}
    </ul>
  );
}

export default EmotionRadioList;
