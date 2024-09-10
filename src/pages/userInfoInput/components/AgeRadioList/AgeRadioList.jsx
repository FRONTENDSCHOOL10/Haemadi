import { useState, useCallback } from 'react';

import styles from './AgeRadioList.module.css';
import RadioInput from '@/components/RadioInput/RadioInput';

const age = [
  '9세 이하',
  '10~14세',
  '15~19세',
  '20~24세',
  '25~30세',
  '31세 이상',
  '비공개',
];

function AgeRadioList() {
  const [selectedAge, setSelectedAge] = useState('');

  const handleAgeChange = useCallback((value) => {
    setSelectedAge(value);
  }, []);

  return (
    <ul className={styles.ageWrapper}>
      {age.map((element) => (
        <li key={element}>
          <RadioInput type="age" groupName="age" onChange={handleAgeChange}>
            {element}
          </RadioInput>
        </li>
      ))}
    </ul>
  );
}

export default AgeRadioList;
