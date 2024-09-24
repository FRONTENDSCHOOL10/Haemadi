import { func, oneOf } from 'prop-types';

import RadioInput from '@/components/RadioInput/RadioInput';
import styles from './RadioList.module.css';
import { memo } from 'react';

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
  onSelect: func,
};

function RadioList({ type, onSelect }) {
  const classNames = `${styles.radioList} ${styles[type + 'Wrapper']}`;

  return (
    <ul className={classNames}>
      {RADIO_VALUES[type].map((element) => (
        <li key={element}>
          <RadioInput type={type} onChange={onSelect}>
            {element}
          </RadioInput>
        </li>
      ))}
    </ul>
  );
}

export default memo(RadioList);
