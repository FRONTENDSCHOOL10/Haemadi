import { useState, useCallback } from 'react';

import styles from './ExperienceRadioList.module.css';
import RadioInput from '@/components/RadioInput/RadioInput';

const experience = [
  '하루도 빠짐 없이 작성한다.',
  '가끔 생각나면 작성한다.',
  '거의 작성하지 않는다',
  '한번도 작성해보지 않았다.',
];

function ExperienceRadioList() {
  const [selectedExperience, setSelectedExperience] = useState('');

  const handleExperienceChange = useCallback((value) => {
    setSelectedExperience(value);
  }, []);

  return (
    <ul className={styles.experienceWrapper}>
      {experience.map((element) => (
        <li key={element}>
          <RadioInput
            type="gender"
            groupName="experience"
            onChange={handleExperienceChange}
          >
            {element}
          </RadioInput>
        </li>
      ))}
    </ul>
  );
}

export default ExperienceRadioList;
