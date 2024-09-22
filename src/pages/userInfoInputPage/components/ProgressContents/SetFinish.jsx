import { memo } from 'react';

import styles from './ProgressContents.module.css';

function SetFinish() {
  return (
    <div className={styles.SetFinish}>
      <p className={styles.title}>
        당신을 위한 섬이
        <br />
        준비되었어요!
      </p>
      <p className={styles.subTitle}>
        마음속 숨겨둔 이야기를
        <br />
        편하게 들려주세요
      </p>
    </div>
  );
}

export default memo(SetFinish);
