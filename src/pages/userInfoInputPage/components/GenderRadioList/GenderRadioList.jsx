import { useState, useCallback } from 'react';

import styles from './GenderRadioList.module.css';
import RadioInput from '@/components/RadioInput/RadioInput';

const gender = ['남', '여', '비공개'];

function GenderRadioList() {
  const [selectedGender, setSelectedGender] = useState('');

  const handleAgeChange = useCallback((value) => {
    setSelectedGender(value);
  }, []);

  return (
    <ul className={styles.genderWrapper}>
      {gender.map((element) => (
        <li key={element}>
          <RadioInput
            type="gender"
            groupName="gender"
            onChange={handleAgeChange}
          >
            {element}
          </RadioInput>
        </li>
      ))}
    </ul>
  );
}

export default GenderRadioList;
