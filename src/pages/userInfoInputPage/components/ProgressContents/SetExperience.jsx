import { memo } from 'react';

import styles from './ProgressContents.module.css';
import RadioList from '@/components/RadioList/RadioList';

function SetExperience({ nickName }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>
        {nickName} 님
        <br />
        일기에 대한 경험이
        <br />
        어느정도인가요?
      </p>
      <p className={styles.subTitle}>
        나와 비슷한 타 사용자와의 소통을 위해
        <br />
        해마디에게 당신의 일기경험을 알려주세요!
      </p>
      <div className={styles.inputWrapper}>
        <RadioList type={'experience'} />
      </div>
    </div>
  );
}

export default memo(SetExperience);
