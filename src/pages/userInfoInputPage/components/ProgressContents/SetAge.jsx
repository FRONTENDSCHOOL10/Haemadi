import { memo } from 'react';
import { string, func } from 'prop-types';

import styles from './ProgressContents.module.css';
import RadioList from '@/components/RadioList/RadioList';

SetAge.propTypes = {
  nickName: string,
  handle: func,
};

function SetAge({ nickName, handle }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {nickName} 님의
        <br />
        나이를 알려주세요
      </p>
      <span className={styles.description}>
        *입력한 개인정보는 외부에 공개되지 않아요
      </span>
      <div className={styles.inputWrapper}>
        <RadioList type={'age'} onSelect={handle} />
      </div>
    </div>
  );
}

export default memo(SetAge);
