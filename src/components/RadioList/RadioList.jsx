import { useState, useCallback } from 'react';
import { oneOf } from 'prop-types';

import styles from './RadioList.module.css';
import RadioInput from '@/components/RadioInput/RadioInput';

const RADIO_VALUES = {
  emotion: [
    '행복해요',
    '평범해요',
    '슬퍼요',
    '피곤해요',
    '꿀꿀해요',
    '힘들어요',
    '모르겠어요',
  ],
  age: [
    '9세 이하',
    '10~14세',
    '15~19세',
    '20~24세',
    '25~30세',
    '31세 이상',
    '비공개',
  ],
  gender: ['남', '여', '비공개'],
  experience: [
    '하루도 빠짐 없이 작성한다.',
    '가끔 생각나면 작성한다.',
    '거의 작성하지 않는다',
    '한번도 작성해보지 않았다.',
  ],
};

RadioList.propTypes = {
  type: oneOf(['gender', 'age', 'emotion', 'experience']).isRequired,
};

function RadioList({ type }) {
  const [selected, setSelected] = useState('');

  const classNames = `${styles.radioList} ${styles[type + 'Wrapper']}`;

  const handleChange = useCallback((value) => {
    setSelected(value);
  }, []);

  return (
    <ul className={classNames}>
      {RADIO_VALUES[type].map((element) => (
        <li key={element}>
          <RadioInput type={type} onChange={handleChange}>
            {element}
          </RadioInput>
        </li>
      ))}
    </ul>
  );
}

export default RadioList;
